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
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import { loginActionForm } from '@/action/login'




const formSchema=z.object({
  email:z.string().email({message: 'Email is required'}),
  password:z.string().min(8 ,{
    message:'Password must be 8 characters'
  }),
})
const LoginForm=()=>{
  const [isLoading , setLoading]=useState(false)
      const router=useRouter()
    const form=useForm({
            resolver:zodResolver(formSchema),
            defaultValues:{
              email:'',
              password:"",
            
            }
          })
          async function onSubmit(values){
            setLoading(true)
            try{
            const formData=new FormData()
            Object.keys(values).forEach(value => formData.append(value, values[value]))
            const result =await loginActionForm(formData)
            console.log(result , 'login result is here')
            if(result.success){
              toast('Login Successfully',{
                            position: "top-left",
                            autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              })

           router.push('/')


            } else{
              throw new Error (result.error || 'Something want wrong (L)!')
              
            }
           

            }catch{
               toast('Login is gone failed',{
                          position: "top-left",
                          autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              })

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
        <Button type="submit" className='w-full font-bold'>Login</Button>
      </form>
    </Form>
    <ToastContainer 
  position="top-left"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick={false}
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
  
   
    />
        </>
    )
}
export default LoginForm;