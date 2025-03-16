'use server'
import aj from '@/lib/arcjet'
import connectDatabase from '@/lib/Database'
import { request } from '@arcjet/next'
import { toast, ToastContainer } from 'react-toastify'
import {z} from 'zod'
import bcrypt from "bcryptjs";
import User from '@/Models/User'


const formSchema=z.object({
  name:z.string().min(2 ,{message:'Name must be 2 characters'}),
  email:z.string().email({message: 'Email is required'}),
  password:z.string().min(8 ,{
    message:'Password must be 8 characters'
  }),
})

export async function registerActionForm(formData){
    const validation=formSchema.safeParse(
        {
        name:formData.get('name'),
        email:formData.get('email'),
        password:formData.get('password'),
        }
    )
    

    if(!validation.success){
      return {
        error : validation.error.errors[0].message,
        status:400
      }
    }
    const {name ,email ,password}=validation.data

    try{
  const  req= await request()
  const decision= await aj.protect (req , {
    email
  })
  if(decision.isDenied()){
    if(decision.reason.isEmail()){
      const emailTypes=decision.reason.emailTypes;
      if(emailTypes.includes('DISPOSABLE')){
        return{
          error :'Disposable email addresses are not allowed',
          status:403,
        }
      }else if(emailTypes.includes("INVALID")){
        return{
          error :'Invalid email',
          status:403,
        }
      }else if(emailTypes.includes('NO_MX_RECORDS')){
        return{
          error :'Email domain does not have valid MX record',
          status:403,
        }
      }else{
        return{
          error :'Email address is not accepted. Please try again. ',
          status:403,
        }
      }

    }else if(decision.reason.isBot()){
      return{
        error:'Bot activity detected',
        status : 403,
      } 
    }else if(decision.reason.isRateLimit()){
      return {
        error: 'Too many requests!Please try again later.',
        status:429,
      }
    }
  }

  
   //database connection
   await connectDatabase()
   const existingUser= await User.findOne({email})
   if(existingUser){
     return toast('User Already Existed')
   }
   const passwordHash=bcrypt.hashSync(password ,10)
   const result= new User({
    name, email , password :passwordHash
   })

   await result.save();
   if(result){
    return {
      success: 'User register successfully'
    }
   }else{
    return{
      error:'Internal server error',
      status:500,
    }
   }







    }catch(e){
        console.log(e ,'Registration Error')
        return{
            message:'Internal Server Error',
            status:500,
        }
    }

}
<ToastContainer/>