"use client";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {};

const InvitePage = (props: Props) => {
  const router = useRouter();
  const [formData, setFormData] = useState<{ email: string }>({
    email: "",
  });

  const [success, setSuccess] = useState(false);

  const invite = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email: formData.email,
        options: {
          shouldCreateUser: true,
        },
      });
      console.log("INVITE DATA");
      console.log(data, error);
      if (data) {
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="container mx-auto w-[400px]">
      <div className="grid">
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={formData?.email}
          onChange={handleChange}
        />
      </div>
      {success && (
        <div className="my-4 bg-green-100 px-2 text-green-600">
          A email has ben sent to {formData.email} to login.
        </div>
      )}
      <div>
        <button onClick={invite}>Invite</button>
      </div>
    </div>
  );
};

export default InvitePage;
