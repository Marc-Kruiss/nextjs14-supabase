import { supabase, supabaseAdmin } from "@/lib/supabase";

export default function Home() {
  const setNewView = async () => {
    console.log("Setting new view...");
    const { data, error } = await supabase
      .from("views")
      .insert({ name: "random name" });
    if (data) console.log(data);
    if (error) console.log(error);
  };
  setNewView();
  return <div>Hello</div>;
}
