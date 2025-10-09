// "use client";

// import { useMemo, useState } from "react";
// import {
//     Card,
//     CardContent,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { toast } from "sonner";
// import {
//     ,
//     useCreateAppointmentMutation,
//     useGetAppointmentsByDoctorQuery,
// } from "@/app/store/features/appointment/appointmentApi";
// import { CreateAppointmentRequest } from "@/types/appointment.type";
// import { useSelector } from "react-redux";
// import { RootState } from "@/app/store/store";

// /* ─────────────────────────────
//    📌 Main Component
// ───────────────────────────── */
// export default function CreateAppointment() {
//     const [form, setForm] = useState({
//         doctor: "",
//         date: "",
//         hour: "8",
//         minute: "00",
//         ampm: "AM",
//         notes: "",
//         description: "",
//         duration: "1",
//         endHour: "",
//         endAmpm: "",
//     });

//     const patient_id = useSelector((state: RootState) => state.auth.user_id);

//     // Queries
//     const { data: doctors = [] } = useGetDoctorsQuery();
//     const { data: doctorAppointmentsData = [], isSuccess: doctorAppointmentsLoaded } =
//         useGetAppointmentsByDoctorQuery(form.doctor, { skip: !form.doctor });

//     const [createAppointment] = useCreateAppointmentMutation();

//     // Cost calculation
//     const costPerHour = 10000;
//     const totalCost = useMemo(() => Number(form.duration) * costPerHour, [form.duration]);

//     const get24HourTime = () => {
//         let hour = parseInt(form.hour);
//         if (form.ampm === "PM" && hour < 12) hour += 12;
//         if (form.ampm === "AM" && hour === 12) hour = 0;
//         return `${hour.toString().padStart(2, "0")}:${form.minute}`;
//     };

//     const isConflict = (
//         date: string,
//         startTime: string,
//         duration: number,
//         appointments: { date: string; duration: number }[]
//     ) => {
//         const newStart = new Date(`${date}T${startTime}`);
//         const newEnd = new Date(newStart.getTime() + duration * 60 * 60 * 1000);

//         return appointments.some((a) => {
//             const existingStart = new Date(a.date);
//             const existingEnd = new Date(existingStart.getTime() + a.duration * 60 * 60 * 1000);
//             return newStart < existingEnd && newEnd > existingStart;
//         });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         const selectedTime = get24HourTime();
//         const doctorConflict =
//             doctorAppointmentsLoaded &&
//             isConflict(form.date, selectedTime, Number(form.duration), doctorAppointmentsData);

//         if (doctorConflict)
//             return toast.error("❌ Doctor already has an appointment at this date & time!");

//         const hour = form.ampm === "PM" && parseInt(form.hour) < 12
//             ? parseInt(form.hour) + 12
//             : form.ampm === "AM" && parseInt(form.hour) === 12
//                 ? 0
//                 : parseInt(form.hour);

//         const isoDate = new Date(form.date);
//         isoDate.setHours(hour, parseInt(form.minute), 0, 0);

//         const payload: CreateAppointmentRequest = {
//             patientId: Number(patient_id),
//             doctorId: Number(form.doctor),
//             date: isoDate.toISOString(),
//             status: "not_started",
//             duration: Number(form.duration),
//             notes: form.notes,
//             costs: totalCost,
//             description: form.description,
//         };

//         try {
//             await createAppointment(payload);
//             toast.success("✅ Appointment successfully created!");
//             setForm({
//                 doctor: "",
//                 date: "",
//                 hour: "8",
//                 minute: "00",
//                 ampm: "AM",
//                 notes: "",
//                 description: "",
//                 duration: "1",
//                 endHour: "",
//                 endAmpm: "",
//             });
//         } catch (err) {
//             toast.error("❌ Failed to create appointment. Try again!");
//             console.error(err);
//         }
//     };

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//         const { name, value } = e.target;
//         setForm((prev) => ({ ...prev, [name]: value }));
//     };

//     return (
//         <div className="min-h-screen bg-background flex justify-center items-start p-4">
//             <main className="w-full max-w-4xl">
//                 <h1 className="text-2xl font-bold mb-2">Create Appointment</h1>
//                 <p className="text-muted-foreground text-sm mb-6">Schedule your appointment with a doctor.</p>

//                 <div className="grid grid-cols-1 gap-6">
//                     <AppointmentForm
//                         form={form}
//                         doctors={doctors}
//                         handleChange={handleChange}
//                         handleSubmit={handleSubmit}
//                         totalCost={totalCost}
//                     />
//                 </div>
//             </main>
//         </div>
//     );
// }

// /* Appointment Form */
// const AppointmentForm = ({ form, doctors, handleChange, handleSubmit, totalCost }: any) => {
//     return (
//         <Card className="rounded-sm border shadow-none">
//             <CardHeader>
//                 <CardTitle className="underline font-mono">Appointment Details</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     {/* Doctor Selection */}
//                     <div>
//                         <label className="text-sm font-medium text-muted-foreground mb-1 block">Select Doctor</label>
//                         <select
//                             name="doctor"
//                             value={form.doctor}
//                             onChange={handleChange}
//                             className="w-full border rounded px-3 py-2 font-mono"
//                             required
//                         >
//                             <option value="">Select Doctor</option>
//                             {doctors.map((d: any) => (
//                                 <option key={d.id} value={d.id}>
//                                     {d.user.name} {d.type ? `| ${d.type}` : ""}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Date & Time */}
//                     <DateTimePicker form={form} handleChange={handleChange} />

//                     {/* Description */}
//                     <div>
//                         <label className="text-sm font-medium mb-1 block text-muted-foreground">Description</label>
//                         <Textarea
//                             name="description"
//                             value={form.description}
//                             onChange={handleChange}
//                             className="shadow-none rounded-sm"
//                         />
//                     </div>

//                     {/* Notes / Type */}
//                     <div>
//                         <label className="text-sm font-medium mb-1 block text-muted-foreground">Appointment Type</label>
//                         <select
//                             name="notes"
//                             value={form.notes}
//                             onChange={handleChange}
//                             className="w-full border rounded px-3 py-2 font-mono"
//                         >
//                             <option value="">Select</option>
//                             <option value="Online">Online</option>
//                             <option value="Offline">Offline</option>
//                         </select>
//                     </div>

//                     <Button type="submit" className="w-full md:w-fit">Save Appointment</Button>
//                     <p className="text-sm mt-2 font-mono">Estimated Cost: {totalCost} MMK</p>
//                 </form>
//             </CardContent>
//         </Card>
//     );
// };

// /* DateTimePicker */
// const DateTimePicker = ({ form, handleChange }: any) => {
//     const to24h = (hour: number, ampm: string) =>
//         ampm === "PM" && hour !== 12 ? hour + 12 : ampm === "AM" && hour === 12 ? 0 : hour;

//     const calculateEndTime = (startHour: number, ampm: string, duration: number) => {
//         let start24 = to24h(startHour, ampm);
//         let end24 = start24 + duration;
//         if (start24 < 8 || end24 > 20) start24 = Math.max(8, Math.min(start24, 20 - duration));
//         end24 = start24 + duration;

//         const startAmpm = start24 >= 12 ? "PM" : "AM";
//         const startHour12 = start24 % 12 || 12;
//         const endAmpm = end24 >= 12 ? "PM" : "AM";
//         const endHour12 = end24 % 12 || 12;

//         return { startHour12, startAmpm, endHour12, endAmpm };
//     };

//     const handleFieldChange = (e: any) => {
//         const { name, value } = e.target;
//         const updatedForm = { ...form, [name]: value };
//         if (["hour", "ampm", "duration"].includes(name)) {
//             const duration = parseInt(updatedForm.duration || "1", 10);
//             const { startHour12, startAmpm, endHour12, endAmpm } = calculateEndTime(
//                 parseInt(updatedForm.hour),
//                 updatedForm.ampm,
//                 duration
//             );
//             updatedForm.hour = startHour12;
//             updatedForm.ampm = startAmpm;
//             updatedForm.endHour = endHour12;
//             updatedForm.endAmpm = endAmpm;
//         }
//         handleChange({ target: { name: "hour", value: updatedForm.hour } });
//         handleChange({ target: { name: "ampm", value: updatedForm.ampm } });
//         handleChange({ target: { name: "duration", value: updatedForm.duration } });
//         handleChange({ target: { name: "endHour", value: updatedForm.endHour } });
//         handleChange({ target: { name: "endAmpm", value: updatedForm.endAmpm } });
//     };

//     return (
//         <div className="grid md:grid-cols-2 gap-4">
//             {/* Date */}
//             <div>
//                 <label className="text-sm font-medium text-muted-foreground">Date</label>
//                 <Input type="date" name="date" value={form.date} onChange={handleChange} required />
//             </div>

//             {/* Start Time */}
//             <div>
//                 <label className="text-sm font-medium text-muted-foreground">Start Time</label>
//                 <div className="flex gap-2">
//                     <select name="hour" value={form.hour} onChange={handleFieldChange} className="px-2 py-1">
//                         {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
//                             <option key={h} value={h}>{h}</option>
//                         ))}
//                     </select>
//                     <select name="minute" value={form.minute} onChange={handleChange} className="px-2 py-1">
//                         <option value="00">00</option>
//                     </select>
//                     <select name="ampm" value={form.ampm} onChange={handleFieldChange} className="px-2 py-1">
//                         <option value="AM">AM</option>
//                         <option value="PM">PM</option>
//                     </select>
//                 </div>
//             </div>

//             {/* Duration */}
//             <div>
//                 <label className="text-sm font-medium text-muted-foreground">Duration</label>
//                 <select name="duration" value={form.duration} onChange={handleFieldChange} className="px-2 py-[6px] w-full">
//                     {[1, 2, 3].map((d) => (
//                         <option key={d} value={d}>{d} hour{d > 1 ? "s" : ""}</option>
//                     ))}
//                 </select>
//             </div>

//             {/* End Time */}
//             <div>
//                 <label className="text-sm font-medium text-muted-foreground">End Time</label>
//                 <Input readOnly value={`${form.endHour || ""}:00 ${form.endAmpm || ""}`} />
//             </div>
//         </div>
//     );
// };
