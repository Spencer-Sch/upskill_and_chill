// app/services/session.server.ts
import { createCookieSessionStorage } from "@remix-run/node";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create session storage
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "sb-session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET || "your-secret-key"],
    secure: process.env.NODE_ENV === "production",
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

// app/routes/login.tsx
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { sessionStorage, supabase } from "~/services/session.server";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return json({ error: error.message });
  }

  if (data?.session) {
    // Create new session
    const session = await sessionStorage.getSession();
    session.set("access_token", data.session.access_token);
    session.set("refresh_token", data.session.refresh_token);
    session.set("user_id", data.session.user.id);

    return redirect("/dashboard", {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    });
  }

  return json({ error: "An unexpected error occurred" });
};

// app/root.tsx
import { json, redirect } from "@remix-run/node";
import {
  getSession,
  getAuthenticatedSupabaseClient,
} from "~/services/session.server";

export const loader = async ({ request }) => {
  const session = await getSession(request);
  const accessToken = session.get("access_token");

  if (!accessToken) {
    return json({ user: null });
  }

  const supabase = await getAuthenticatedSupabaseClient(request);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    // Clear session if authentication fails
    return redirect("/login", {
      headers: {
        "Set-Cookie": await sessionStorage.destroySession(session),
      },
    });
  }

  return json({ user });
};

// Middleware to protect routes
// app/utils/auth.server.ts
import { redirect } from "@remix-run/node";
import { getSession } from "~/services/session.server";

export async function requireAuth(request: Request) {
  const session = await getSession(request);
  const userId = session.get("user_id");

  if (!userId) {
    throw redirect("/login");
  }

  return userId;
}

// Example protected route
// app/routes/todo.tsx
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireAuth } from "~/utils/auth.server";
import { getAuthenticatedSupabaseClient } from "~/services/session.server";

export const loader = async ({ request }) => {
  const userId = await requireAuth(request);
  const supabase = await getAuthenticatedSupabaseClient(request);

  // Use authenticated client to fetch data
  const { data, error } = await supabase
    .from("your_table")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;

  return json({ data });
};

// Logout functionality
// app/routes/logout.tsx
import { redirect } from "@remix-run/node";
import {
  getSession,
  sessionStorage,
  supabase,
} from "~/services/session.server";

export const action = async ({ request }) => {
  const session = await getSession(request);
  await supabase.auth.signOut();

  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
};
