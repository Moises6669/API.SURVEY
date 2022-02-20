const User = require("../../../models/user.models");

const signup = async (req, res) => {
  let body = req.body;
  try {
    const user = new User(body);
    await user.save();
    if (user) {
      res.status(201).json({
        ok: true,
        user,
      });
    }
  } catch (error) {
    return res.json(400).json({
      ok: false,
    });
  }
};

module.exports = {
  signup,
};
