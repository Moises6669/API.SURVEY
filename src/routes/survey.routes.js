const express = require("express");
const routes = express.Router();

const {
  postSurvey,
  getAllSurveys,
  getAllSurveysByUser,
  answerSurvey,
  getOneSurveys,
} = require("../controllers/init");

const {
  messageValidate,
  surveyValidate,
  validateImage,
  validateQuestions,
} = require("../middlewares/init");

const { uploads } = require("../middlewares/init");

routes.post(
  "/survey",
  [
    uploads.single("image"),
    surveyValidate(),
    messageValidate,
    validateImage,
    validateQuestions,
  ],
  postSurvey
);

routes.post("/survey/answer/:id", answerSurvey);
routes.get("/surveys", getAllSurveys);
routes.get("/surveys/:id", getOneSurveys);
routes.get("/surveys/user/:id", getAllSurveysByUser);

module.exports = routes;
