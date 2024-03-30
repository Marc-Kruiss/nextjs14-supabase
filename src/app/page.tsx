"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <div>
      You are Logged in
      <button
        onClick={logout}
        className="px-2 py-1 bg-blue-500 text-white cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}
