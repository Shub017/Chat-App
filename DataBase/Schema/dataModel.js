import mongoose from "mongoose";

export const messageSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },

    message:{
        type:String,
        required:true
    },

    time:{
        type:String,
        required:true
    }
})