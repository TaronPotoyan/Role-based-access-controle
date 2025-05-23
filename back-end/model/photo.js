import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
  path: String,      
  contentType: String,
  filename: String,    
  createdAt: {        
    type: Date,
    default: Date.now
  }
});

const Photo = mongoose.model('Photo', photoSchema);
export default Photo;