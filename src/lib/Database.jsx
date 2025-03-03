import mongoose from "mongoose"

const connectDatabase=async()=>{
    mongoose.connect(process.env.MongoDB_URI)
    .then(()=> console.log('MongoDB is connected successfully'))
    .catch((e)=>console.error(e))
}
export default connectDatabase;