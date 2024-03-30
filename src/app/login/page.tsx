"use client";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {};

const LoginPage = (props: Props) => {
  const router = useRouter();
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    }
  );
  const [resetPassowrd, setResetPassowrd] = useState(false);
  const [success, setSuccess] = useState(false);

  const login = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (data) {
        console.log(data);
        router.refresh();
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

  const sendResetPassword = async () => {
    try {
      const { data: resetData, error } =
        await supabase.auth.resetPasswordForEmail(formData.email, {
          redirectTo: `${window.location.href}reset`,
        });
      setSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto w-[400px] grid gap-4">
      {!resetPassowrd && (
        <div className="grid gap-4">
          <div className="grid">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={formData?.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData?.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <button onClick={login}>Login</button>
          </div>
        </div>
      )}
      {resetPassowrd && (
        <div className="grid gap-4">
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
            <div className="bg-green-100 text-green-600 px-2 rounded">
              Success! Check your email to reset your password.
            </div>
          )}
          <button
            className="cursor-pointer hover:underline"
            onClick={sendResetPassword}
          >
            Reset my password
          </button>
        </div>
      )}
      <p
        className="cursor-pointer hover:underline"
        onClick={() => setResetPassowrd(!resetPassowrd)}
      >
        {resetPassowrd ? "Login" : "Reset my password"}
      </p>
    </div>
  );
};

export default LoginPage;
