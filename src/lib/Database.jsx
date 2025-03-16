import mongoose from "mongoose"

const connectDatabase=async()=>{
    mongoose.connect(process.env.MongoDB_URI)
    .then(()=> console.log('Mongoose is connected successfully'))
    .catch((e)=>console.error(e , 'Mongoose Error'))
}
export default connectDatabase;