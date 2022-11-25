const surveyModel = require("../../../../models/survey.models");
const userModel = require("../../../../models/user.models");
const { getQuestions } = require("../../../../utils/createSurvey");
const { uploadProfileImage } = require("../../../../helpers/Cloudinary");
const fs = require("fs-extra");

const postSurvey = async (req, res) => {
  const { description, title, privacity, created_by, questions } = req.body;
  const image = req.file.path;

  try {
    let survey = new surveyModel();
    const imageSurvey = await uploadProfileImage(image);

    survey.title = title;
    survey.privacity = privacity;
    survey.created_by = created_by;
    survey.description = description;
    survey.img = imageSurvey;

    fs.unlinkSync(req.file.path);

    const author = await userModel.findOne({ _id: survey.created_by });

    if (!author) {
      return res.status(403).json({
        ok: false,
        msg: "El usuario con el que intenta crear la encuesta no existe",
      });
    }

    survey.author = author.username;
    survey.questions = getQuestions(questions);

    await survey.save();

    return res.status(200).json({
      ok: true,
      message: "Encuesta creada satisfactoriamente",
      _id: `${survey._id}`,
      user: survey.name,
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "oh! ha ocurrido un error al crear la encuesta",
    });
  }
};

module.exports = {
  postSurvey,
};
