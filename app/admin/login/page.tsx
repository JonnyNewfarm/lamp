// app/admin/login/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_COOKIE_NAME = "calero_admin_key";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
    from?: string;
  }>;
}) {
  const params = await searchParams;

  async function loginAction(formData: FormData) {
    "use server";

    const key = String(formData.get("key") || "").trim();
    const from = String(formData.get("from") || "/admin/products");

    if (!process.env.ADMIN_KEY) {
      redirect("/admin/login?error=missing-key");
    }

    if (key !== process.env.ADMIN_KEY) {
      redirect("/admin/login?error=invalid");
    }

    const cookieStore = await cookies();

    cookieStore.set(ADMIN_COOKIE_NAME, key, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    if (from.startsWith("/admin") && from !== "/admin/login") {
      redirect(from);
    }

    redirect("/admin/products");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#ecebeb] px-6 text-[#161310]">
      <form
        action={loginAction}
        className="w-full max-w-md border border-[#161310]/15 p-8"
      >
        <input
          type="hidden"
          name="from"
          value={params.from || "/admin/products"}
        />

        <p className="text-xs uppercase tracking-[0.34em] text-[#161310]/45">
          Calero Studio
        </p>

        <h1 className="mt-4 text-6xl font-light tracking-[-0.07em]">Admin</h1>

        <p className="mt-5 text-sm leading-[1.7] text-[#161310]/55">
          Enter your admin key to continue.
        </p>

        {params.error && (
          <p className="mt-5 border border-red-700/20 bg-red-700/5 px-4 py-3 text-sm text-red-700">
            Invalid admin key.
          </p>
        )}

        <label className="mt-8 block">
          <span className="mb-3 block text-sm text-[#161310]/55">
            Admin key
          </span>

          <input
            name="key"
            type="password"
            required
            autoFocus
            className="w-full border border-[#161310]/15 bg-transparent px-4 py-4 outline-none"
          />
        </label>

        <button className="mt-6 w-full bg-[#161310] px-6 py-4 text-sm text-[#ecebeb]">
          Login
        </button>
      </form>
    </main>
  );
}
