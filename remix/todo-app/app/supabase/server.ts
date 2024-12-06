import { createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr'
// import type { Database } from '../database.types'
// import type { LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node'

export const supaAuth = (request: Request) => {
  const headers = new Headers()
  
  return createServerClient(
    process.env.SUPABASE_URL!, 
    process.env.SUPABASE_ANON!, {
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get('Cookie') ?? '')
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          headers.append('Set-Cookie', serializeCookieHeader(name, value, options))
        )
      },
    },
  })
}