import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require: true,
    },
    email:{
        type:String,
        require: true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        require: true,
        select:false,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    isPremium:{
        type:Boolean,
        default: false,
    },

})
export default mongoose.models.User ||  mongoose.model('User',UserSchema);
