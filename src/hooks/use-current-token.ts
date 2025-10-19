import { useMemo } from "react";
import { Appointment } from "@/types/appointment.type";

export function useCurrentToken(
  appointments: Appointment[],
  date?: Date // optional date parameter
) {
  return useMemo(() => {
    if (!appointments || appointments.length === 0) return null;

    // Use provided date or default to today
    const targetDate = date ? new Date(date) : new Date();
    const targetY = targetDate.getFullYear();
    const targetM = targetDate.getMonth();
    const targetD = targetDate.getDate();

    console.log("Calculating current token for date:", targetDate);
    console.log("Appointments:", appointments);

    // Filter appointments for the target date
    const sameDayAppointments = appointments
      .filter((a) => {
        const d = new Date(a.date);
        return (
          d.getFullYear() === targetY &&
          d.getMonth() === targetM &&
          d.getDate() === targetD
        );
      })
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

    console.log("Same day appointments:", sameDayAppointments);

    if (sameDayAppointments.length === 0) return null;

    // Find the first appointment not done or cancelled
    const activeIndex = sameDayAppointments.findIndex(
      (a) =>
        a.status.toLowerCase() !== "done" &&
        a.status.toLowerCase() !== "cancelled"
    );

    if (activeIndex === -1) return null;

    // Token number is 1-based index
    return activeIndex + 1;
  }, [appointments, date]);
}
