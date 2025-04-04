import { jwtVerify } from "jose";

 export default async function verifyAuth(token) {
    if(!token){
        return null;
    }
    try{
        const {payload}=await jwtVerify(token , new TextEncoder().encode(process.env.JWT_SECRET))
        return{
            userId:payload.userId,
            email:payload.email,
            userName:payload.userName,
        }
    }catch(e){
        console.log(e ,'fetching token')
    }
}