import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  if(!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  } // We will edit this to make it page unique as well

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/assistant",
    "/cases/:path*",
    "/history",
    "/vault",
  ], // Specify the routes the middleware applies to
};