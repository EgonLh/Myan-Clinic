"use client";
import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  redirect("/dashboard/admin");

  return <p>Redirecting to admin...</p>;
}
