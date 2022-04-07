const { Schema, model } = require("mongoose");

const MongooseUnique = require("mongoose-unique-validator");

const jwt = require("jsonwebtoken");

const bcrypjs = require("bcryptjs");

const salt = 10;

const ValidRols = {
  values: ["ADMIN_ROLE", "USER_ROLE"],
  message: "{VALUE} it is not a valid role",
};

const User = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
    },
    img: {
      type: String,
    },
    google: {
      type: Boolean,
      default: false,
    },
    facebook: {
      type: String,
      default: false,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    rols: {
      type: String,
      enum: ValidRols,
      default: "USER_ROLE",
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// to signup a user
User.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypjs.genSalt(salt, function (err, salt) {
      if (err) return next(err);

      bcrypjs.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

User.methods.comparepassword = function (password, cb) {
  bcrypjs.compare(password, this.password, function (err, isMatch) {
    if (err) return cb(next);
    cb(null, isMatch);
  });
};

User.methods.generateToken = function (cb) {
  var user = this;
  var token = jwt.sign(
    {
      _id: user._id.toHexString(),
      name: user.name,
      email: user.email,
      verify: user.verify,
    },
    process.env.SECRET
  );

  user.token = token;

  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

// find by token
User.statics.findByToken = function (token, cb) {
  var user = this;

  jwt.verify(token, process.env.SECRET, function (err, decode) {
    user.findOne({ _id: decode, token: token }, function (err, users) {
      if (err) return cb(err);

      cb(null, users);
    });
  });
};

User.methods.deleteToken = function (token, cb) {
  var user = this;

  user.update({ $unset: { token: 1 } }, function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

User.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

User.plugin(MongooseUnique, { message: "{PATH} Must be unique" });

module.exports = model("Users", User);
