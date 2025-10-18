"use client";

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
import { ScrollArea } from "../ui/scroll-area";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback } from "../ui/avatar";
import ChatBotBox from "./chatbot";

export default function CreateAppointment() {
  const [form, setForm] = useState({
    date: "",
    notes: "",
    description: "",
  });

  const patient_id = useSelector(
    (state: RootState) => state?.auth?.user?.user_id
  );

  const [createAppointment] = useCreateAppointmentMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.date) {
      toast.error("❌ Please select a date for the appointment.");
      return;
    }

    const isoDateObj = new Date(form.date);
    isoDateObj.setHours(0, 0, 0, 0);
    const isoDate = isoDateObj.toISOString();

    const payload: CreateAppointmentRequest = {
      patientId: Number(patient_id),
      date: isoDate,
      status: "not_started",
      duration: 1,
      notes: form.notes || "Diagnosis",
      costs: 10000,
      description: form.description,
    };

    try {
      await createAppointment(payload);
      toast.success("✅ Appointment successfully created!");
      setForm({ date: "", notes: "", description: "" });
    } catch (err) {
      toast.error("❌ Failed to create appointment. Try again!");
      console.error(err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row gap-6 p-4">
      {/* Appointment Form */}
      <main className="flex-1 max-w-3xl">
        <h1 className="text-2xl font-bold mb-2">Create Appointment</h1>
        <p className="text-muted-foreground text-sm mb-6">
          Schedule your appointment (date only).
        </p>

        <Card className="rounded-sm border shadow-none">
          <CardHeader>
            <CardTitle className="underline font-mono">Appointment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Date */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">
                  Appointment Date
                </label>
                <Input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Description */}
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

              {/* Appointment Type */}
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

              <Button type="submit" className="w-full md:w-fit">
                Save Appointment
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      {/* Chat Section */}
      <ChatBotBox />
    </div>
  );
}
