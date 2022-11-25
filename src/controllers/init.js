const { signup } = require("./V1/API/user/signup");
const { login } = require("./V1/API/user/login");
const { postSurvey } = require("./V1/API/survey/createSurvey");
const { answerSurvey } = require("./V1/API/survey/answerSurvey");
const {
  getAllSurveys,
  getAllSurveysByUser,
  getOneSurveys,
} = require("./V1/API/survey/getSurveys");

module.exports = {
  signup,
  login,
  postSurvey,
  answerSurvey,
  getAllSurveys,
  getAllSurveysByUser,
  getOneSurveys,
};
