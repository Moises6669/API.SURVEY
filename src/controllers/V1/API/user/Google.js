const { OAuth2Client } = require("google-auth-library");
const { Token } = require("../../../../services/Tokens");
const User = require("../../../../models/user.models");
const client = new OAuth2Client(
  "984513182957-u9vf98ap3hi74hg5p7maephj3vnvjf0v.apps.googleusercontent.com"
);

const googleVerify = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience:
      "984513182957-u9vf98ap3hi74hg5p7maephj3vnvjf0v.apps.googleusercontent.com",
  });
  const payload = ticket.getPayload();
  return {
    username: payload.name,
    email: payload.email,
    img: payload.picture,
    verify: true,
    google: true,
  };
};

const oauthGoogle = async (req, res) => {
  let token = req.body.idtoken;

  const googleUser = await googleVerify(token).catch((Err) => {
    return res.status(403).json({
      ok: false,
      error: Err,
    });
  });

  try {
    const findUser = await User.findOne({ email: googleUser.email });

    if (findUser) {
      let token = new Token().generateToken(findUser, "5m");

      return res.status(201).json({
        ok: true,
        user: findUser,
        token,
      });
    }

    const newUser = new User(googleUser);
    newUser.save();
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = {
  oauthGoogle,
};
