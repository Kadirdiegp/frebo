import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  
  // Öffentliche Routen erlauben
  if (request.nextUrl.pathname.startsWith('/api/motocross') ||
      request.nextUrl.pathname.startsWith('/api/images') ||
      request.nextUrl.pathname.startsWith('/api/events')) {
    return NextResponse.next()
  }

  // Admin-Routen schützen
  if (request.nextUrl.pathname.startsWith('/api/admin')) {
    if (!token?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/:path*',
    '/admin/:path*'
  ]
}
