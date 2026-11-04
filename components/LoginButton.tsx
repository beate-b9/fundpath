"use client";

import { createClient } from "@/lib/supabase/client";

export default function LoginButton() {
  async function signIn() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <button
      onClick={signIn}
      className="mt-10 rounded-full bg-[#E8772E] px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-[#D4661F]"
    >
      Join the waitlist with Google
    </button>
  );
}
