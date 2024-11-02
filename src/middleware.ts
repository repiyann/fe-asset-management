import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get('next-auth.session-token')
  const isLoginOrRegister =
    req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register'

  if (token && isLoginOrRegister) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  if (!token && req.nextUrl.pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard', '/tes', '/login', '/register'],
}
