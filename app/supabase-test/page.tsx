export default async function SupabaseTest() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/health`,
    {
      headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY! },
    },
  );

  return (
    <main className="p-10 text-2xl">
      {res.ok
        ? "✅ Connected to Supabase!"
        : `❌ Not connected (status ${res.status})`}
    </main>
  );
}
