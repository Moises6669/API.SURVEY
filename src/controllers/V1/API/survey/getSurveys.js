const surveyModel = require("../../../../models/survey.models");

exports.getAllSurveys = (req, res) => {
  surveyModel.find({}, (err, surveys) => {
    if (err)
      return res.status(500).json({
        message: "Error inesperado al traer toadas las encuestas",
        err,
      });

    if (!surveys)
      return res.status(404).json({
        message: "No hay encuestas disponibles",
      });

    res.status(200).json({
      ok: true,
      survey: surveys,
    });
  });
};

exports.getOneSurveys = (req, res) => {
  const { id } = req.params;
  surveyModel.findOne({ _id: id }, (err, surveys) => {
    if (err)
      return res.status(500).json({
        message: "Error inesperado al obtener esta encuesta",
        err,
      });

    if (!surveys)
      return res.status(404).json({
        message: "Esta encuesta no existe",
      });

    res.status(200).json({
      ok: true,
      survey: surveys,
    });
  });
};

exports.getAllSurveysByUser = (req, res) => {
  const { id } = req.params;
  surveyModel.find({ created_by: id }, (err, surveys) => {
    if (err)
      return res.status(500).json({
        message: "Error inesperado al obtener esta encuesta",
        err,
      });

    if (!surveys)
      return res.status(404).json({
        message: "Este usuario no tiene encuestas",
      });

    res.status(200).json({
      ok: true,
      survey: surveys,
    });
  });
};
