import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "~/services/session.server";
import { supabase } from '../../supabase/client';

type User = {
  email: string;
  // password?: string;
};

type UserLogin = User & { 
  password: string 
}

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<User>(sessionStorage);

// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = String(form.get("email"));
    const password = String(form.get("password"));
    console.log(email, password);
    // const user = await login(email, password)
    // const { data, error } = await supabase.auth.signInWithPassword({
    //   email,
    //   password
    // })
    // console.log(data)
    // if (error) throw error
    // supabase.auth.getSession(email, password)
    // the type of this user must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method
    // return User
    return { email };
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass"
);
