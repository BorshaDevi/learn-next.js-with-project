import { jwtVerify } from "jose";

 export default async function verifyAuth(token) {
    if(!token){
        return null;
    }
    try{
        const {payload}=await jwtVerify(token , process.env.JWT_SECRET)

    }catch(e){
        console.log(e)
    }
}