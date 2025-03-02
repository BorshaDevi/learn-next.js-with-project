import LoginForm from "@/Component/LoginForm";
import Image from "next/image";
import Link from "next/link";

const Login=()=>{
    return(
        <>
        <div className='min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-r from-gray-100 to-gray-200'>
          <div className='w-full md:w-1/2 flex items-center justify-center p-8 lg:p-12'>
          <div className='w-full max-w-md space-y-8 bg-white rounded-lg shadow-lg'>
            <div className='space-y-2 m-5'>
            <h1 className="text-gray-900 text-3xl font-bold tracking-tight text-center">Login</h1>
            <p className="text-center">Login and go to your destination</p>
            <LoginForm></LoginForm>
            <p className='p-2 text-center text-xl'>Create New  Account.
      <Link href='/register' className='font-bold hover:text-blue-500'>Register</Link>
    </p>
  </div>
          </div>
          </div>
          <div className='hidden md:flex  w-full   p-12 items-center justify-center relative'>
            
            <div className='w-full h-full opacity-10 space-y-6 text-white bg-blue-50 z-10 absolute '>
              <h2 className='text-4xl mt-72 text-black font-bold '>
                Welcome to our Website.   
              </h2>
            </div>
            
              <Image width={950} height={500} src="/coffe.jpg"  alt="coffee" className='absolute inset-0 object-cover w-full h-full ' />
          </div>
        </div>
        
        </>
    )
}
export default Login;