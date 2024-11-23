import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import {
  getSession,
  sessionStorage,
  supabase,
} from "~/services/session.server";
import Button from "~/components/Button";
import TextInput from "~/components/TextInput";
import { createClient } from "@supabase/supabase-js";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request);
  const accessToken = session.get("access_token");

  // If user has an access token, verify it's still valid
  if (accessToken) {
    const supabaseClient = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON!
    );

    // Set the session to verify the token
    supabaseClient.auth.setSession({
      access_token: accessToken,
      refresh_token: session.get("refresh_token"),
    });

    const {
      data: { user },
      error,
    } = await supabaseClient.auth.getUser();

    // If token is valid and user exists, redirect to todo page
    if (!error && user) {
      return redirect("/todo");
    }

    // If token is invalid, destroy the session
    return redirect("/login", {
      headers: {
        "Set-Cookie": await sessionStorage.destroySession(session),
      },
    });
  }

  // If no token exists, allow access to login page
  return json({ isAuthenticated: false });
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const { data, error } = await supabase.auth.signInWithPassword({
    email: String(email),
    password: String(password),
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

    return redirect("/todo", {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    });
  }

  return json({ error: "An unexpected error occurred" });
}

export default function Screen() {
  return (
    <Form
      method="post"
      className="flex flex-col justify-center items-center bg-primary-400 space-y-10 p-10 w-fit rounded-md"
    >
      <TextInput inputName="email" label="Email" required />
      <TextInput
        inputName="password"
        label="Password"
        inputType="password"
        required
      />
      <Button label="Sign In" fullWidth />
    </Form>
  );
}
