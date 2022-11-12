const surveyModel = require("../../../../models/survey.models");

const answerSurvey = async (req, res) => {
  let id_poll = req.params.id;
  let questions = req.body.questions;

  try {
    const survey = await surveyModel.findOne({ id: id_poll });

    if (!survey) {
      return res.status(404).json({
        ok: false,
        msg: "Encuesta no encontrada",
      });
    }

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

    await survey.save();

    res.status(201).json({
      ok: true,
      msg: "Respuesta enviada con exito",
      survey,
    });
    
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un problema al intentar contestar esta encuesta",
    });
  }
};

module.exports = {
  answerSurvey,
};
