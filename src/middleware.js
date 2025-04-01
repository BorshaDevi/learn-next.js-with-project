
import { createMiddleware } from '@arcjet/next'
import aj from './lib/arcjet'
import { NextResponse } from 'next/server'


export const config={
    matcher: ["/((?!_next/static|_next/image|favicon.ico|healthz).*)"],
}


const arcJetMiddleware= createMiddleware(aj)
export async function middleware(request){
    const arcJetResponse=arcJetMiddleware(request)
     const response=NextResponse.next()
    
}