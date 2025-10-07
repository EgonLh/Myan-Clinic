"use client"; //#
import { useGetUserByIdQuery } from "@/app/store/features/users/userApi";
import { RootState } from "@/app/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setDoctorData, setDoctorId } from "@/app/store/features/doctor/doctorSlice";
import LoadingPixelCharacter from "@/components/ui/loading";

export default function HomePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  // fetch user data based on doc query 
  const { data, isLoading, isError, error } = useGetUserByIdQuery(Number(user?.id) ?? 0, {
    skip: !user?.id,
  });
  // storing doc id for getting it
  useEffect(() => {
    if (data && data.doctor) {
      dispatch(setDoctorId(data.doctor.id)); // for doctor id
      dispatch(setDoctorData(data.doctor));  // for storing doc data
      router.push("/dashboard/doctor/appointment");
    }
  }, [data, dispatch, router]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingPixelCharacter message="Data is Loading..." />
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        <LoadingPixelCharacter message="Data is Fetching..." />
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoadingPixelCharacter message="Redirecting..." />
    </div>
  );
}
