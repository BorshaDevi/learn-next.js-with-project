'use client'
import {object, z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {Button} from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from 'react'



const formSchema=z.object({
  name:z.string().min(2 ,{message:'Name must be 2 characters'}),
  email:z.string().email({message: 'Email is required'}),
  password:z.string().min(8 ,{
    message:'Password must be 8 characters'
  }),
})
const RegisterForm=()=>{
    const [isLoading , setLoading]=useState(false)
    const form=useForm({
        resolver:zodResolver(formSchema),
        defaultValues:{
          name:'',
          email:'',
          password:"",
        
        }
      })
      function onSubmit(values){
        
        setLoading(true)
        try{
          console.log(values)
          const datas=object.keys(values)
          forEach((key) => FormData.append(key , values[key])){
            
          }
            
          });

        }catch (e){
          console.log(e)

        }finally{
          setLoading(false)
        }
      }
    return(
        <>
         <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="**********" {...field}  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className='w-full font-bold '>Register</Button>
      </form>
    </Form>
        </>
    )
}
export default RegisterForm;