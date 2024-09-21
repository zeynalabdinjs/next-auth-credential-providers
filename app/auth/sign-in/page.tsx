"use client";

import { signIn, SignInResponse } from "next-auth/react";
import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("zeynalabdinjs@gmail.com");
  const [password, setPassword] = useState("Test123456");
  const [load, setLoad] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoad(true);
    const result: SignInResponse | undefined = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    setLoad(false);
    if (result?.error) toast.error(result?.error || "Not authorized");
    else {
      toast.success("Welcome to dashboard");
      router.push("/dashboard");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-4 h-[calc(100vh-100px)]">
      <Input type="email" label="Email" value={email} onChange={(e: any) => setEmail(e.target.value)} className="max-w-[300px]" color="primary" />
      <Input type="password" label="Password" value={password} onChange={(e: any) => setPassword(e.target.value)} className="max-w-[300px]" color="primary" />
      <Button type="submit" variant="shadow" color="primary" className="w-full max-w-[300px]" isLoading={load}>
        Login
      </Button>
    </form>
  );
}
