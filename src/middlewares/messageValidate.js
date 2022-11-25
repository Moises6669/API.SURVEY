const { validationResult } = require("express-validator");

const messageValidate = (req, res, next) => {
  const error = validationResult(req);
  
  if (error.isEmpty()) return next();

  let errors;

  fs.unlinkSync(req.file.path);

  error.array().map((Err) => {
    errors = JSON.stringify(Err.msg);
    console.log(errors);
  });

  return res.status(422).json({
    ok: false,
    error: errors,
  });
};

module.exports = {
  messageValidate,
};
