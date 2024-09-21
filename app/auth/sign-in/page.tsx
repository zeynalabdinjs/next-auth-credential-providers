"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button, Input } from "@nextui-org/react";

export default function LoginPage() {
  const [username, setUsername] = useState("zeynalabdinjs@gmail.com");
  const [password, setPassword] = useState("Test123456");
  const [load, setLoad] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoad(true);
    const res = await signIn("credentials", {
      redirect: true,
      username,
      password,
    });
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-4 h-[calc(100vh-100px)]">
      <Input type="email" label="Email" value={username} onChange={(e: any) => setUsername(e.target.value)} className="max-w-[300px]" color="primary" />
      <Input type="password" label="Password" value={password} onChange={(e: any) => setPassword(e.target.value)} className="max-w-[300px]" color="primary" />
      <Button type="submit" variant="shadow" color="primary" className="w-full max-w-[300px]" isLoading={load}>
        Login
      </Button>
    </form>
  );
}
