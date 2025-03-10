'use server'
import aj from '@/lib/arcjet'
import { request } from '@arcjet/next'
import {z} from 'zod'

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
  console.log(decision , "Decision Data is here.")


    }catch(e){
        console.log(e ,'Registration Error')
        return{
            message:'Internal Server Error',
            status:500,
        }
    }

}