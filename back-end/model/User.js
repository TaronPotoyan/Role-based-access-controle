import mongoose from "mongoose";
import { type } from "os";

const user = new mongoose.Schema({
    name : { 
        type : String ,
        required : true,
        trime : true
    },
    password : {
        type : String,
        required : true,
        trime : true,   
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    Role :  {
        type : String,
        default : 'user',
    },
    avatar : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photo',
        required : false
    },
    reset : {
        type : Boolean,
        default : false
    },key : {
        type : String,
        default : null
    }
});

const User = mongoose.model('User',user);

export default User;