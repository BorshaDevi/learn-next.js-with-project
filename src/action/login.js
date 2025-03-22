'use server'
import { ajLogin } from '@/lib/arcjet'
import connectDatabase from '@/lib/Database'
import User from '@/Models/User'
import { request } from '@arcjet/next'
import {z} from 'zod'



const formSchema=z.object({
  email:z.string().email({message: 'Email is required'}),
  password:z.string().min(8 ,{
    message:'Password must be 8 characters'
  }),
})

export async function loginActionForm(formData){
  const validation = formSchema.safeParse(
    {
      email:formData.get('email'),
      password:formData.get('password')
    }
  )


if(!validation.success){
  return{
    error: 'validation Error',
    status:400,
  }
}
const {email , password} =validation.data
try{
const req= await request()
const decision= await ajLogin.protect(req, {
  email:email,
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
  }else if(decision.reason.isShield()){
    return {
      error: 'You are suspicious!',
      status:403,
    }
  }
  else if(decision.reason.isRateLimit()){
    return {
      error: 'Too many requests!Please try again later.',
      status:403,
    }
  }
}
 //database 
 await connectDatabase()
 const user= await User.findOne({email}).select('')
 if(!user){
  return {
    error:'User not found!',
    status:401
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