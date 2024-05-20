import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

const sessionPages = ["/portfolio", "/settings"];
const noSessionPages = ["/signin"];

function isSessionPage(req: NextRequest) {
  return sessionPages.includes(req.nextUrl.pathname);
}

function isNoSessionPage(req: NextRequest) {
  return noSessionPages.includes(req.nextUrl.pathname);
}

async function isAuthorized() {
  const session = await auth();
  return session ? true : false;
}

export default async function middleware(req: NextRequest) {
  if (await isAuthorized()) {
    // authorized
    if (isNoSessionPage(req)) {
      // page requires no session
      return NextResponse.redirect(new URL("/", req.nextUrl.href)); // redirect to home
    }
  } else {
    // not authorized
    if (isSessionPage(req)) {
      // page requires session
      return NextResponse.redirect(new URL("/signin", req.nextUrl.href)); // redirect to signin
    }
  }

  return NextResponse.next();
}
