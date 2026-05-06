 import type { NextRequest } from 'next/server'
 import { NextResponse } from 'next/server'
 
 export function middleware(request: NextRequest) {
   const { pathname } = request.nextUrl
 
   // Canonicalizamos FAQ a minúsculas para consistencia con el Footer.
   if (pathname === '/FAQ') {
     const url = request.nextUrl.clone()
     url.pathname = '/faq'
     return NextResponse.redirect(url, 308)
   }
 
   return NextResponse.next()
 }
 
 export const config = {
   matcher: ['/FAQ'],
 }
 
