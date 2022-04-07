const { v4: uuidv4 } = require("uuid");
const path = require("path");
const multer = require("multer");

const estorage = multer.diskStorage({
  destination: path.join(__dirname, "../public/uploads"),
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname).toLowerCase());
  },
});

const uploads = multer({
  storage: estorage,
  dest: path.join(__dirname, "../public/uploads"),

  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|svg|jfif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("error: Archivo debe ser una imagen valida");
  },
});

module.exports = { uploads };
