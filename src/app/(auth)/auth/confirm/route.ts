import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/profile";

  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");

  if (token_hash && type) {
    const supabase = createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      // create empty portfolio
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (!userError) {
        // TODO: confirm that this is working
        console.log("Creating portfolio for user:", user);
        const { error: portfolioError } = await supabase
          .from("portfolio")
          .insert({
            user_id: user!.id,
            full_name: "",
            title: "",
            bio: "",
          });

        if (!portfolioError) {
          redirectTo.searchParams.delete("next");
          return NextResponse.redirect(redirectTo);
        }

        console.error("Error creating portfolio:", portfolioError);
      }
    }
  }

  // return the user to an error page with some instructions
  redirectTo.pathname = "/error";
  return NextResponse.redirect(redirectTo);
}
