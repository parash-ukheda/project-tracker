const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectCreatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  projectName: {
    type: String,
    required: true,
    unique: [true, "Please enter unique project name"],
  },
  description: {
    type: String,
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  plantName: {
    type: String,
    required: true,
  },
  manager: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Planning", "Active", "Completed", "On Hold", "Reject", "Cancelled"],
    default: "Planning",
  },
  startDate: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Regex for DD/MM/YYYY format
        return /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid date format! Use DD/MM/YYYY.`,
    },
  },
 
  dueDate: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Regex for DD/MM/YYYY format
        return /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid date format! Use DD/MM/YYYY.`,
    },
  },
  progress : {
    type:Number,
    default:0
  }
  
},{timestamps:true});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project
