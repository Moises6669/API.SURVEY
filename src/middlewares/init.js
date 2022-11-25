const {
  emailValidate,
  userSingupValidate,
  usernameValidate,
} = require("./auth");

const {
  surveyValidate,
  validateImage,
  validateQuestions,
} = require("./survey.validation");

const { uploads } = require("./img.upload");

const { messageValidate } = require("./messageValidate");

module.exports = {
  emailValidate,
  userSingupValidate,
  usernameValidate,
  surveyValidate,
  validateQuestions,
  validateImage,
  messageValidate,
  uploads,
};
