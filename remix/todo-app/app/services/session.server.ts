import { createCookieSessionStorage } from "@remix-run/node";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create session storage
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "sb-session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET || "your-secret-key"],
    // secure: process.env.NODE_ENV === "production",
    secure: process.env.NODE_ENV === "development",
  },
});

// Helper to get session data
export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

// Helper to create authenticated supabase client
export async function getAuthenticatedSupabaseClient(request: Request) {
  const session = await getSession(request);
  const accessToken = session.get("access_token");
  const refreshToken = session.get("refresh_token");

  if (accessToken && refreshToken) {
    supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  }

  return supabase;
}
