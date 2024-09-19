import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const username = cookies().get("username")?.value

  console.log("🚀 ~ middleware ~ req.nextUrl.pathname:", username, req.nextUrl.pathname)
  if (!username && !["/", "/login"].includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(`/login?path=${req.nextUrl.pathname}`, req.url))
  }
}


// export default middleware
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/quiz/:path*', '/profile'],
}