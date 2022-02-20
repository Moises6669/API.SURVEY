const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PollSchema = new Schema({

  created_by:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  author:{
    type: String,
    required: true
  },
  description: {type:String, required:true},
  questions: [{
    name: String,
    options:[{
      option: String,
      rate:{type: Number, default: 0,}
    }]
  }],
  answered_by:{
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

});


PollSchema.pre('save', function(next){
  let date = new Date();
  let day = date.getDate();
  date.setDate(day + 30);
  this.expired_at = date;
  next();
});


module.exports = mongoose.model('Poll', PollSchema);   