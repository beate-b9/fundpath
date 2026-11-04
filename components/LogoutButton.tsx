"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  }

  return (
    <button
      onClick={signOut}
      className="rounded-full border border-[#1A1A1A] px-6 py-2 text-sm font-semibold hover:bg-[#1A1A1A] hover:text-[#F5EFE6]"
    >
      Log out
    </button>
  );
}
