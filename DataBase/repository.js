import mongoose from "mongoose";
import { messageSchema } from "./Schema/dataModel.js";

export default class messageRepository{
    constructor(){
        this.messageModel = mongoose.model('Chatter Up', messageSchema);
    }

    storeMessage = async (msg)=>{
        try{
            const newMessage = new this.messageModel({
            userName: msg.userName,
            message: msg.message,
            time: msg.time,
            });

            await newMessage.save();
        }catch(err){
            console.log(err);
        }

        
    }

    retrieveMessages = async () => {
        try {
            const messages = await this.messageModel.find({});
            return messages;
        } catch (error) {
            console.log(err);
        }
    }
}