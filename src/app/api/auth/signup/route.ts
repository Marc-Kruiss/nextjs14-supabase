import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const url = new URL(req.url);

  const formData = await req.formData();

  console.log("POST SIGNUP DATA");
  console.log(formData);

  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const cookieStore = cookies();

  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${url.origin}/api/auth/callback`,
    },
  });

  return NextResponse.redirect(url.origin, { status: 301 });
}
