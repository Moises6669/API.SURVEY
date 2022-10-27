const surveyModel = require("../../../../models/survey.models");

exports.answerSurvey = (req, res) => {
  let id_poll = req.params.id;
  let questions = req.body.questions;

  surveyModel.findOne({ id: id_poll }, (error, survey) => {
    if (survey && !error) {
      try {
        questions.map((question) => {
          const tempSurvey = survey.questions.find(
            (data) => data._id.toString() === question.id
          );
          if (tempSurvey.type === "open") {
            tempSurvey.answers.push(question.response);
          } else {
            tempSurvey.options.find(
              (option) =>
                option._id.toString() === question.response && option.rate++
            );
          }
        });
        survey
          .save()
          .then((data) => {
            res.json({
              ok: true,
              msg: "Respuesta enviada con exito",
              data,
            });
          })
          .catch((error) => {
            res.json({
              ok: false,
              msg: "Ha ocurrido un problema al intentar contestar esta encuesta",
              error,
            });
          });
      } catch (error) {
        res.json({
          ok: false,
          msg: "Ha ocurrido un problema al intentar contestar esta encuesta",
          error,
        });
      }
    } else {
      res.json({
        ok: false,
        msg: "Ha ocurrido un problema al intentar contestar esta encuesta",
      });
    }
  });
};
