const express = require("express");
const routes = express.Router();

const { postSurvey } = require('../survey/createSurvey')
const { getAllSurveys } = require('../survey/getSurveys')

routes.post("/survey/create", postSurvey);
routes.get("/surveys", getAllSurveys);

module.exports = routes;