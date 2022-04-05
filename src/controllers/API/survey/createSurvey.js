const surveyModel = require("../../../models/survey.models");
const userModel = require("../../../models/user.models");
const { getQuestions } = require("../../../utils/functions/createSurvey");

exports.postSurvey = (req, res) => {
  const { description, title, privacity, created_by, questions } = req.body;

  if (description && title && privacity && created_by && questions) {
    try {
      let survey = new surveyModel();

      survey.title = title;
      survey.privacity = privacity;
      survey.created_by = created_by;
      survey.description = description;

      userModel.findOne({ _id: survey.created_by }, (error, userDB) => {
        if (userDB && !error) {
          survey.author = userDB.username;
          survey.questions = getQuestions(questions);

          survey.save((err, surveyStored) => {
            if (err)
              return res.status(500).json({
                message:
                  "Ha ocurrido un error al almacenar su encuesta en la base de datos",
                err,
              });

            return res.status(200).json({
              ok: true,
              message: "Encuesta creada satisfactoriamente",
              _id: `${surveyStored._id}`,
              user: userDB.name,
            });
          });
        } else {
          return res.status(403).json({
            ok: false,
            msg: "El usuario con el que intenta crear la encuesta no existe",
          });
        }
      });
    } catch (error) {
      return res.status(403).json({
        ok: false,
        msg: "oh! ha ocurrido un error",
      });
    }
  } else {
    return res.status(403).json({
      ok: false,
      msg: "Favor, revise sus campos, no se permiten campos vacios",
    });
  }
};
