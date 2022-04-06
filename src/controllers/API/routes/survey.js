const express = require("express");
const routes = express.Router();

const { postSurvey } = require('../survey/createSurvey')
const { getAllSurveys } = require('../survey/getSurveys')
const { answerSurvey } = require('../survey/answerSurvey')

routes.post("/survey/create", postSurvey);
routes.post("/survey/answer/:id", answerSurvey);
routes.get("/surveys", getAllSurveys);

module.exports = routes;