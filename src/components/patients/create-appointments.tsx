"use client";
// ----- Component: CreateAppointment ----- //
// - Review [x]
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useCreateAppointmentMutation } from "@/app/store/features/appointment/appointmentApi";
import { CreateAppointmentRequest } from "@/types/appointment.type";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import ChatBotBox from "./chatbot";

export default function CreateAppointment() {
  // ----- Form State ----- //
  const [form, setForm] = useState({
    date: "",
    notes: "",
    description: "",
  });

  // ----- Get logged-in patient ID from Redux ----- //
  const patient_id = useSelector(
    (state: RootState) => state?.auth?.user?.user_id
  );

  // ----- API Mutation ----- //
  const [createAppointment] = useCreateAppointmentMutation();

  // ----- Handle Form Submission ----- //
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: ensure date is selected
    if (!form.date) {
      toast.error(" Please select a date for the appointment.");
      return;
    }

    // Set default time to 12:00 AM
    const isoDateObj = new Date(form.date);
    isoDateObj.setHours(23, 0, 0, 0);
    const isoDate = isoDateObj.toISOString();

    // Prepare payload for API
    const payload: CreateAppointmentRequest = {
      patientId: Number(patient_id),
      date: isoDate,
      status: "not_started",
      duration: 1,
      notes: form.notes + " - Diagnosis",
      costs: 10000,
      description: form.description,
    };

    try {
      // Call API to create appointment
      await createAppointment(payload);
      toast.success("✅ Appointment successfully created!");
      // Reset form
      setForm({ date: "", notes: "", description: "" });
    } catch (err) {
      toast.error(" Failed to create appointment. Try again!");
      console.error(err);
    }
  };

  // ----- Handle Form Input Changes ----- //
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-fit grid xl:grid-cols-2 grid-cols-1   flex flex-col lg:flex-row gap-5">

      {/* ----- Chatbot Section ----- */}
      <ChatBotBox />

      {/* ----- Appointment Form Section ----- */}
      <main className="flex-1 w-full order-0">


        <Card className="rounded border shadow-none">
          <CardHeader className="mx-5 p-1">
            <CardTitle className=" border-b-2 pb-3 border-dashed font-mono hover:underline hover:decoration-wavy underline-offset-3 ">Create A Diagnosis Appointment</CardTitle>
            <p className="text-muted-foreground indent-8 text-sm  text-justify tracking-wide">
              Create your appointment for Diagnosis with our medical professionals.
              After submission, our team will review and confirm your appointment. The professional will assign to the specialist.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* ----- Appointment Date Input ----- */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">
                  Appointment Date
                </label>
                <Input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="shadow-none font-mono"
                  required
                />
              </div>

              {/* ----- Description Input ----- */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">
                  Description
                </label>
                <Textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="shadow-none rounded-sm"
                />
              </div>

              {/* ----- Appointment Type Select ----- */}
              <div>
                <label className="text-sm font-medium mb-1 block text-muted-foreground">
                  Appointment Type
                </label>
                <select
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 font-mono"
                >
                  <option value="">Select</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>
              {/* ----- Submit Button ----- */}
              <Button type="submit" className="w-full mt-3 md:w-fit">
                Save Appointment
              </Button>

            </form>
          </CardContent>
        </Card>
      </main>

    </div>
  );
}
