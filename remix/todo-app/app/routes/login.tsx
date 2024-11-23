import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { sessionStorage, supabase } from "~/services/session.server";
import Button from "~/components/Button";
import TextInput from "~/components/TextInput";

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
