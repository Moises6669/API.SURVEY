const { Schema, model } = require("mongoose");
const { enumPrivacity, enumTypeQuestion } = require('../utils/data/enums')

const SurveySchema = new Schema({
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: { type: String, required: true },
  questions: [{
    name: String,
    type: {
      type: String,
      enum: enumTypeQuestion
    },
    options: [{
      value: String,
      required: false,
      rate: { type: Number, default: 0, }
    }]
  }],
  answered_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  expired_at: {
    type: Date
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  privacity: {
    type: String,
    enum: enumPrivacity,
    default: 'public'
  },
  img: {
    type: String
  }
});


SurveySchema.pre('save', function (next) {
  let date = new Date();
  let day = date.getDate();
  date.setDate(day + 30);
  this.expired_at = date;
  next();
});

module.exports = model("Surveys", SurveySchema);