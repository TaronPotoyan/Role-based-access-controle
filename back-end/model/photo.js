import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String
});

const Photo =  mongoose.model('Photo', photoSchema);
export default Photo;