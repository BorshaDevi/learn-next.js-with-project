
import { createMiddleware } from '@arcjet/next'
import aj from './lib/arcjet'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import verifyAuth from './lib/auth'


export const config={
    matcher: ["/((?!_next/static|_next/image|favicon.ico|healthz).*)"],
}


const arcJetMiddleware= createMiddleware(aj)
export async function middleware(request){
    const arcJetResponse= await arcJetMiddleware(request)
    let response=NextResponse.next()
    
    //protected routes
    const routes=['/']
    const routeMatcher=routes.some(router => request.nextUrl.pathname === router || request.nextUrl.pathname.startsWith(router + '/' ))
    if(routeMatcher){
        const token=(await cookies()).get('token')?.value
        const user= token? await verifyAuth(token) : null
        if(!user){
            if(request.nextUrl.pathname !== '/login'){
                const loginUrl= new URL('/login' ,  request.url);
                loginUrl.searchParams.set('from' ,request.nextUrl.pathname )
                response = NextResponse.redirect(loginUrl)
            }
        }

    }

     if(arcJetResponse && arcJetResponse.headers){
        arcJetResponse.headers.forEach((value ,key  ) =>{
            response.headers.set(key , value)
        })
    }
    if(arcJetResponse && arcJetResponse.status !==200){
        return arcJetResponse  
    }
                       
          return response;
}