"use client";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data, status } = useSession();
  if (status == "loading") return <p>Yükleniyor...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Hello: {[data?.user.firstName, data?.user.lastName].join(" ")}</p>
    </div>
  );
}
