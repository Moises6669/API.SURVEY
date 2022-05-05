const mongoose = require("mongoose");

mongoose
  .connect('mongodb+srv://steven:oTnojgUBImjiaHO1@cluster0.ruh0x.mongodb.net/survey?retryWrites=true&w=majority', {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then((db) => console.log("Connection estabislished with MongoDB"))
  .catch((err) => console.log(err, "error"));
