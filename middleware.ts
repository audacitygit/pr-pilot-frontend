import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const session = req.cookies.get("connect.sid"); // 🛑 Only checks session cookie

    const protectedRoutes = ["/dashboard", "/profile", "/repos", "/pull-requests", "/settings"];

    const isProtected = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route));

    if (isProtected && !session) {
        return NextResponse.redirect(new URL("/auth/signin", req.url)); // ⬅️ Redirect if no session
    }

    return NextResponse.next(); // ✅ Allow request if session exists
}

export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*", "/repos/:path*", "/pull-requests/:path*", "/settings/:path*"],
};
