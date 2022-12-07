const mongoose = require("mongoose");

taskSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "must provide name"],
    trim:true,
    maxlength:[40,'max length should not be more than 40']
 },
  completed:{type :Boolean, default:false},
});

module.exports = mongoose.model("task", taskSchema);
