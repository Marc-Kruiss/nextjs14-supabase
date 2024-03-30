"use client";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {};

const ResetPasswordPage = (props: Props) => {
  const router = useRouter();
  const [formData, setFormData] = useState<{
    password: string;
    confirmPassword: string;
  }>({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const confirmPasswords = async () => {
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword)
      return alert("Your passwords are incorrect!");

    const { data: resetData, error } = await supabase.auth.updateUser({
      password: formData.password,
    });

    if (resetData) {
      router.push("/");
    }
    if (error) console.log(error);
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="container mx-auto w-[400] grid gap-4">
      <div className="grid">
        <label>Enter your new password</label>
        <input
          className="text-black"
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData?.password}
          onChange={handleChange}
        />
      </div>
      <div className="grid">
        <label>Confirm your new password</label>
        <input
          className="text-black"
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          value={formData?.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <div
        className="cursor-pointer hover:underline"
        onClick={() => setShowPassword(!showPassword)}
      >
        <p className="text-sm">Show passwords</p>
      </div>
      <div>
        <button
          onClick={confirmPasswords}
          className="px-2 py-1 bg-blue-500 text-white cursor-pointer"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
