import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

const sessionPages = ["/portfolio", "/settings"];
const noSessionPages = ["/signin"];
const errors: Record<string, string> = {
  OAuthAccountNotLinked:
    "OAuth account not linked to user. Please try a different sign in method.",
  CredentialsSignin: "Invalid email or password. Please try again.",
  access_denied: "Access denied. Please try again.",
};

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
  const { search } = req.nextUrl;

  const error = search.match(/error=([^&]*)/);
  if (error) {
    console.log(error);
    const keys = Object.keys(errors);
    const errorKey = keys.find((key) => key === error[1]);
    let errorValue = errorKey
      ? errors[errorKey]
      : "Unknown error occured. Please try again.";
    const res = NextResponse.redirect(new URL("/signin", req.nextUrl.href));
    res.headers.set(
      "Set-Cookie",
      `error=${errorValue}; Path=/; Max-Age=10; HttpOnly`
    );
    return res;
  }

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
