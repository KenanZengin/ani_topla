import { NextResponse, type NextRequest } from "next/server";


export function middleware(request: NextRequest){
    
    const { nextUrl } = request;

    const token = request.cookies.get("auth_token")?.value;
    const path = nextUrl.pathname;

    const isPublicPath = ["/forgot-password","/","/register","/login"];
    const isPrivatePath = ["/dashboard","/album","/create-event","/user-plan"];
    
    if(isPrivatePath.includes(path) && !token){
        return NextResponse.redirect(new URL("/login",request.url))
    }
    if(isPublicPath.includes(path) && token){
        return NextResponse.redirect(new URL("/dashboard",request.url))
    }
    
}


export const config = {
    matcher: 
        [
            "/",
            "/forgot-password",
            "/login",
            "/register",
            "/dashboard",
            "/album",
            "/create-event",
            "/user-plan",
        ],
  }
