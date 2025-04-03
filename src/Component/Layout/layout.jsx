import { cookies } from "next/headers";
import Header from "./Header";
import verifyAuth from "@/lib/auth";


const CommonLayout=async({children})=>{
    const token=(await cookies()).get('token')?.value
    const user=await verifyAuth(token)
    return (
        <div className="min-h-screen">
        {user && <Header></Header> }
        {children}
        </div>
    )
}
export default CommonLayout;