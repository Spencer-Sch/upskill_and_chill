import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

// First, we can export a loader function where we check if the user is
// authenticated with `authenticator.isAuthenticated` and redirect to the
// dashboard if it is or return null if it's not
export async function loader({ request }: LoaderFunctionArgs) {
  // If the user is already authenticated redirect to /dashboard directly
  const user = await authenticator.isAuthenticated(request, {
    successRedirect: "/todo",
  });
  console.log("user - login: ", user);
  return user;
}

// Second, we need to export an action function, here we will use the
// `authenticator.authenticate method`
export async function action({ request }: ActionFunctionArgs) {
  // we call the method with the name of the strategy we want to use and the
  // request object, optionally we pass an object with the URLs we want the user
  // to be redirected to after a success or a failure
  const loginRes = await authenticator.authenticate("user-pass", request, {
    successRedirect: "/todo",
  });
  console.log("login Res: ", loginRes);
  return loginRes;
}

// Finally, we create our UI with the form doing a POST and the inputs with the
// names we are going to use in the strategy
export default function Screen() {
  return (
    <Form method="post">
      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" required />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        autoComplete="current-password"
        required
      />
      <button>Sign In</button>
    </Form>
  );
}