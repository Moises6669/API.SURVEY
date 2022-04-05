const surveyModel = require("../../../models/survey.models");

exports.getAllSurveys = (req,res) => {
    surveyModel.find({}, (err, surveys) => {
        if (err)
          return res.status(500).json({
            message: "Error inesperado al traer toadas las encuestas 🧾🤦‍♂️",
            err
          });

        if (!surveys)
          return res.status(404).json({
            message: "No hay encuestas disponibles 💔😯"
          });
    
        res.status(200).json({
          ok:true,
          survey:surveys
        });
      });
}