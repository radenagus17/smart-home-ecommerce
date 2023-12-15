import { NextRequest, NextResponse } from "next/server";

const Middleware = (req, res) => {
  if (req.nextUrl.pathname.startsWith("/auth/user-login")) {
    if (req.cookies.get("token-user") !== undefined) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  if (req.nextUrl.pathname.startsWith("/auth/user-register")) {
    if (req.cookies.get("token-user") !== undefined) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  if (req.nextUrl.pathname.startsWith("/user/checkout")) {
    if (req.cookies.get("token-user") === undefined) {
      return NextResponse.redirect(new URL("/auth/user-login", req.url));
    }
  }
};

export default Middleware;
