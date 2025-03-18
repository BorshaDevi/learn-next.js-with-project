'use server'
import { ajLogin } from '@/lib/arcjet'
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
  email,
})


if(decision.isDenied()){
  
}


}catch(e){
  console.log(e ,'Registration Error')
  return{
      message:'Internal Server Error',
      status:500,
  }
}



}