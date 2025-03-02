'use client'
import {z} from 'zod'
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
import Link from 'next/link'


const formSchema=z.object({
  name:z.string(),
  email:z.string().email(),
  password:z.string().min(8 ,{
    message:'Password must be 8 characters'
  }),
})

const Register=()=>{
  const form=useForm({
    resolver:zodResolver(formSchema),
    defaultValues:{
      name:'',
      email:'',
      password:"",
    
    }
  })
  function onSubmit(values){
    console.log(values)
  }
    
    return(
        <div className='min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-r from-gray-100 to-gray-200'>
          <div className='w-full md:w-1/2 flex items-center justify-center p-8 lg:p-12'>
          <div className='w-full max-w-md space-y-8 bg-white rounded-lg shadow-lg'>
            <div className='space-y-2 m-5'>
            <h1 className="text-gray-900 text-3xl font-bold tracking-tight">Register</h1>
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
                <Input placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    <p className='p-2 text-center text-xl'>Already have  Account?
      <Link href='/login' className='font-bold hover:text-blue-500'>Log in</Link>
    </p>
  </div>
          </div>
          </div>
          <div className='hidden md:flex  w-full   p-12 items-center justify-center relative'>
            
            <div className='w-full h-full opacity-15 space-y-6 text-white bg-blue-50 z-10 absolute '>
              <h2 className='text-4xl mt-72 text-black font-bold '>
                Welcome to our Website.   
              </h2>
            </div>
            
              <img src="/coffe.jpg" alt="coffee" className='absolute inset-0 object-cover w-full h-full ' />
          </div>
        </div>
    )
}
export default Register;