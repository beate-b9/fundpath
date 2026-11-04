import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      const { error: waitlistError } = await supabase.from("waitlist").upsert(
        {
          user_id: data.user.id,
          email: data.user.email,
          full_name: data.user.user_metadata.full_name,
        },
        { onConflict: "user_id", ignoreDuplicates: true },
      );

      if (waitlistError) {
        console.error("Could not save to waitlist:", waitlistError.message);
      }

      return NextResponse.redirect(`${origin}/`);
    }
  }

  return NextResponse.redirect(`${origin}/?error=login_failed`);
}
