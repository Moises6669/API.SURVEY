const { validationResult, body } = require("express-validator");
const User = require("../models/user.models");
const fs = require("fs-extra");

const surveyValidate = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("El titulo de la encuesta es requerido")
      .not(),
    body("description").notEmpty().withMessage("La descripcion es requerida"),
    body("privacity")
      .notEmpty()
      .withMessage("Se requiere la privacidad de la encuesta"),
    body("created_by")
      .notEmpty()
      .withMessage("Es requerido el creador de la encuesta"),
  ];
};

const validateImage = (req, res, next) => {
  if (!req.file) {
    return res.status(403).json({
      ok: false,
      msg: "Imagen requerida",
    });
  }
  next();
};

const validateQuestions = (req, res, next) => {
  const questions = req.body.questions;
  if (!questions) {
    return res.status(403).json({
      ok: false,
      msg: "Pregunta requerida",
    });
  }
  next();
};

module.exports = {
  surveyValidate,
  validateImage,
  validateQuestions,
};
