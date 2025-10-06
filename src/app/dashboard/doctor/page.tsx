"use client";

import { useGetUserByIdQuery } from "@/app/store/features/users/userApi";
import { RootState } from "@/app/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setDoctorData, setDoctorId } from "@/app/store/features/doctor/doctorSlice";

export default function HomePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const { data, isLoading, isError, error } = useGetUserByIdQuery(Number(user?.id) ?? 0, {
    skip: !user?.id,
  });

  useEffect(() => {
    if (data && data.doctor) {
      console.log("Fetched user with doctor:", data);

      // ✅ Save doctor ID and doctor data into Redux
      dispatch(setDoctorId(data.doctor.id));
      dispatch(setDoctorData(data.doctor));

      // ✅ Wait a bit or use effect dependency to ensure state is updated before redirect
      router.push("/dashboard/doctor/appointment");
    }
  }, [data, dispatch, router]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading user data...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        <p>Failed to load user data.</p>
        <p>{String(error)}</p>
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting to your dashboard...</p>
    </div>
  );
}
