"use client";
// --- Redirect to admin dashboard --- //
// - Review [x]
import { redirect, useRouter } from "next/navigation";
import LoadingPills from "@/components/ui/loading";

export default function Dashboard() {
  const router = useRouter();

  redirect("/dashboard/admin");

  return <div><LoadingPills message="Redirecting to admin..." /></div>;
}
