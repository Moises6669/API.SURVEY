const surveyModel = require("../../../../models/survey.models");
const userModel = require("../../../../models/user.models");
const { getQuestions } = require("../../../../utils/functions/createSurvey");
const { uploadProfileImage } = require("../../../../services/Cloudinary");
const fs = require("fs-extra");

const postSurvey = async (req, res) => {
  const { description, title, privacity, created_by, questions } = req.body;
  const image = req.file.path;

  if (description && title && privacity && created_by && questions && image) {
    try {
      let survey = new surveyModel();
      const imageSurvey = await uploadProfileImage(image);
      
      survey.title = title;
      survey.privacity = privacity;
      survey.created_by = created_by;
      survey.description = description;
      survey.img = imageSurvey;
      
      fs.unlinkSync(req.file.path);

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

module.exports = {
  postSurvey,
};
