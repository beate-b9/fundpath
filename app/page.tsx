import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const firstName = user?.user_metadata.full_name?.split(" ")[0];

  return (
    <main className="min-h-screen bg-[#F5EFE6] text-[#1A1A1A]">
      {/* Top bar */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1A1A1A] font-bold text-[#F5EFE6]">
            F
          </div>
          <span className="text-xl font-bold tracking-tight">FundPath</span>
        </div>
        {user ? (
          <LogoutButton />
        ) : (
          <span className="rounded-full border border-[#1A1A1A] px-4 py-1 text-sm">
            Coming soon
          </span>
        )}
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-20 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#E8772E]">
          Budgeting & reporting for small NGOs
        </p>
        <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-6xl">
          Reports on time.
          <br />
          Funding kept safe.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-[#4A4A4A]">
          FundPath tracks your NGO&apos;s budget and writes your funder reports
          for you, so you spend less time on paperwork and never miss a deadline
          again.
        </p>

        {user ? (
          <div>
            {/* Profile card */}
            <div className="mx-auto mt-10 max-w-md rounded-2xl border border-[#1A1A1A]/10 bg-white p-8 shadow-lg">
              {user.user_metadata.avatar_url && (
                <Image
                  src={user.user_metadata.avatar_url}
                  alt="Profile picture"
                  width={80}
                  height={80}
                  className="mx-auto rounded-full"
                />
              )}
              <h2 className="mt-4 text-2xl font-bold">
                You&apos;re on the list, {firstName}!
              </h2>
              <p className="mt-2 text-[#4A4A4A]">{user.email}</p>
            </div>

            {/* Google data, hidden until clicked */}
            <details className="mx-auto mt-8 max-w-2xl text-left">
              <summary className="cursor-pointer text-sm text-[#6B6B6B]">
                Show what Google shared with us
              </summary>
              <pre className="mt-2 overflow-x-auto rounded-xl bg-[#1A1A1A] p-4 text-xs text-[#F5EFE6]">
                {JSON.stringify(user.user_metadata, null, 2)}
              </pre>
            </details>
          </div>
        ) : (
          <>
            <LoginButton />
            <p className="mt-4 text-sm text-[#6B6B6B]">
              Free for early members
            </p>
          </>
        )}
      </section>

      {/* Features */}
      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 md:grid-cols-3">
        <div className="rounded-2xl border border-[#1A1A1A]/10 bg-white/60 p-8">
          <div className="mb-4 text-3xl"></div>
          <h3 className="text-xl font-bold">Automated reports</h3>
          <p className="mt-2 text-[#4A4A4A]">
            Turn your spending data into funder-ready reports in minutes, not
            days.
          </p>
        </div>
        <div className="rounded-2xl border border-[#1A1A1A]/10 bg-white/60 p-8">
          <div className="mb-4 text-3xl"></div>
          <h3 className="text-xl font-bold">Never miss a deadline</h3>
          <p className="mt-2 text-[#4A4A4A]">
            Every grant deadline in one place, with reminders before it&apos;s
            too late.
          </p>
        </div>
        <div className="rounded-2xl border border-[#1A1A1A]/10 bg-white/60 p-8">
          <div className="mb-4 text-3xl"></div>
          <h3 className="text-xl font-bold">Internal budgeting</h3>
          <p className="mt-2 text-[#4A4A4A]">
            See what each grant has left to spend, so there are no surprises at
            audit time.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1A1A1A]/10 py-8 text-center text-sm text-[#6B6B6B]">
        © 2026 FundPath · Built for the people doing the good work
      </footer>
    </main>
  );
}
