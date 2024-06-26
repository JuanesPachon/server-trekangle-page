import mongoose from "../config/mongoose.config.js";

const experienceSchema = mongoose.Schema({
  name: {type: String},
  place: {type: String},
  price: {type: Number},
  description:{type: String},
  images:[String],
  deleteAt:{
    type: Date,
    default: null,
  },
});

const Experience = mongoose.model("Experience", experienceSchema);

export default Experience;