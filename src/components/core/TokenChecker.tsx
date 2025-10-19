"use client";
// ----- Token Checker Component -----//
// This component allows users to check the current token number for appointments on a selected date.
import { useState } from "react";
import { useCurrentToken } from "@/hooks/use-current-token";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetAppointmentsQuery } from "@/app/store/features/appointment/appointmentApi";



export default function TokenChecker() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().slice(0, 10)); // YYYY-MM-DD
  const dateObj = new Date(selectedDate);
  const { data: appointment_data } = useGetAppointmentsQuery();
  // Get the current token for the selected date
  const currentToken = useCurrentToken(appointment_data || [], dateObj);

  return (
    <div className="flex flex-col gap-2">
        <div className="flex text-center flex-col items-center border rounded gap-2">
          <Input
            type="date"
            id="date"
            value={selectedDate}
            className=" w-fit h-fit shadow-none border-none text-xs "
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <div className="text-center font-mono font-bold">
          {currentToken
            ? `Current Token Number: #${currentToken}`
            : "No active appointments for this date"}
        </div>
    </div>
  );
}
