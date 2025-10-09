"use client";

import { useMemo, useState } from "react";
import { Sidebar } from "@/components/doctors/siderbar";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandInput,
    CommandItem,
    CommandList,
    CommandGroup,
    CommandEmpty,
} from "@/components/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
    useGetPatientsQuery,
} from "@/app/store/features/patient/patientApi";
import {
    useGetDoctorsQuery,
} from "@/app/store/features/doctor/doctorApi";
import {
    useCreateAppointmentMutation,
    useGetAppointmentsByDoctorQuery,
    useGetAppointmentsByPatientQuery,
} from "@/app/store/features/appointment/appointmentApi";
import { CreateAppointmentRequest } from "@/types/appointment.type";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

/* ─────────────────────────────
   📌 Main Component
───────────────────────────── */
export default function CreateAppointment() {
    const [form, setForm] = useState({
        patient: "",
        doctor: "",
        date: "",
        hour: "8",
        minute: "00",
        ampm: "AM",
        notes: "",
        description: "",
        duration: "1",
        endHour: "",
        endAmpm: "",
    });
    const doctorData = useSelector((state: RootState) => state.doctor?.data)
    // Queries
    const { data: patients = [] } = useGetPatientsQuery();
    const { data: doctors = [] } = useGetDoctorsQuery();

    const { data: doctorAppointmentsData = [], isSuccess: doctorAppointmentsLoaded } =
        useGetAppointmentsByDoctorQuery(form.doctor, { skip: !form.doctor });

    const { data: patientAppointmentsData = [], isSuccess: patientAppointmentsLoaded } =
        useGetAppointmentsByPatientQuery(form.patient, { skip: !form.patient });

    const [createAppointment] = useCreateAppointmentMutation();

    // Cost calculation
    const costPerHour = 10000;
    const totalCost = useMemo(() => Number(form.duration) * costPerHour, [form.duration]);

    const get24HourTime = () => {
        let hour = parseInt(form.hour);
        if (form.ampm === "PM" && hour < 12) hour += 12;
        if (form.ampm === "AM" && hour === 12) hour = 0;
        return `${hour.toString().padStart(2, "0")}:${form.minute}`;
    };

    const isConflict = (
        date: string,
        startTime: string,
        duration: number,
        appointments: { date: string; duration: number }[]
    ) => {
        const newStart = new Date(`${date}T${startTime}`);
        const newEnd = new Date(newStart.getTime() + duration * 60 * 60 * 1000);

        return appointments.some((a) => {
            const existingStart = new Date(a.date);
            const existingEnd = new Date(existingStart.getTime() + a.duration * 60 * 60 * 1000);

            // Overlap condition: (A starts before B ends) && (A ends after B starts)
            return newStart < existingEnd && newEnd > existingStart;
        });
    };


    // Submit handler
    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        const selectedTime = get24HourTime();
        const doctorConflict =
            doctorAppointmentsLoaded &&
            isConflict(form.date, selectedTime, Number(form.duration), doctorAppointmentsData);

        const patientConflict =
            patientAppointmentsLoaded &&
            isConflict(form.date, selectedTime, Number(form.duration), patientAppointmentsData);



        if (doctorConflict)
            return toast.error("❌ Doctor already has an appointment at this date & time!");
        if (patientConflict)
            return toast.error("❌ Patient already has an appointment at this date & time!");

        const hour = form.ampm === "PM" && parseInt(form.hour) < 12
            ? parseInt(form.hour) + 12
            : form.ampm === "AM" && parseInt(form.hour) === 12
                ? 0
                : parseInt(form.hour);

        const isoDate = new Date(form.date);
        isoDate.setHours(hour, parseInt(form.minute), 0, 0);

        const payload: CreateAppointmentRequest = {
            patientId: Number(form.patient),
            doctorId: Number(form.doctor),
            date: isoDate.toISOString(),
            status: "not_started", 
            duration: Number(form.duration),
            notes: `Assigned By ${doctorData.name} -` + form.notes,
            costs: totalCost,
            description: form.description,
        };

        try {
            await createAppointment(payload);
            toast.success("✅ Appointment successfully created!");
            // set form reset
            setForm({
                patient: "",
                doctor: "",
                date: "",
                hour: "8",
                minute: "00",
                ampm: "AM",
                notes: "",
                description: "",
                duration: "1",
                endHour: "",
                endAmpm: "",
            })
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

    const formatTime = (isoString: string) =>
        new Date(isoString).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-background flex justify-center">
            {/* Sidebar */}
            <div className="w-full md:w-64 flex-shrink-0">
                <Sidebar />
            </div>

            {/* Main Content */}
            <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-[80rem] overflow-x-hidden">
                <Header />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AppointmentForm
                        form={form}
                        setForm={setForm}
                        patients={patients}
                        doctors={doctors}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
                    <AppointmentSummary
                        form={form}
                        patients={patients}
                        doctors={doctors}
                        doctorAppointmentsData={doctorAppointmentsData}
                        patientAppointmentsData={patientAppointmentsData}
                        doctorAppointmentsLoaded={doctorAppointmentsLoaded}
                        patientAppointmentsLoaded={patientAppointmentsLoaded}
                        formatTime={formatTime}
                        totalCost={totalCost}
                    />
                </div>
            </main>
        </div>
    );
}

/* Header */
const Header = () => (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">Create Appointment</h1>
            <p className="text-muted-foreground font-mono text-xs">Fill out the form to schedule a new appointment.</p>
        </div>
    </div>
);

/* Appointment Form */
const AppointmentForm = ({ form, setForm, patients, doctors, handleChange, handleSubmit }: any) => {
    const [openPatient, setOpenPatient] = useState(false);
    const [openDoctor, setOpenDoctor] = useState(false);

    return (
        <Card className="rounded-sm border shadow-none">
            <CardHeader>
                <CardTitle className="underline font-mono">Create Appointment</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                        <SelectField
                            label="Select Patient"
                            open={openPatient}
                            setOpen={setOpenPatient}
                            selected={form.patient}
                            data={patients}
                            field="patient"
                            setForm={(e: any) => handleChange(e)}
                            required
                        />
                        <SelectField
                            label="Select Doctor"
                            open={openDoctor}
                            setOpen={setOpenDoctor}
                            selected={form.doctor}
                            data={doctors}
                            field="doctor"
                            setForm={(e: any) => handleChange(e)}
                        />
                    </div>
                    <DateTimePicker form={form} handleChange={handleChange} setForm={setForm} />

                    <div>
                        <label className="text-sm font-medium mb-1 block font-mono text-muted-foreground">Description</label>
                        <Textarea name="description" value={form.description} onChange={handleChange} className="shadow-none rounded-sm" />
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-1 block font-mono text-muted-foreground">Appointment Type :</label>
                        <select
                            name="notes"
                            value={form.notes}
                            onChange={handleChange}
                            className="w-full border rounded font-mono px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                            <option value="">Select</option>
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                        </select>
                    </div>

                    <Button type="submit" className="w-full md:w-fit">
                        Save Appointment
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full ms-2 md:w-fit "
                        onClick={() =>
                            setForm({
                                patient: "",
                                doctor: "",
                                date: "",
                                hour: "8",
                                minute: "00",
                                ampm: "AM",
                                notes: "",
                                description: "",
                                duration: "1",
                                endHour: "",
                                endAmpm: "",
                            })
                        }
                    >
                        Clear Form
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

/* Select Field */
const SelectField = ({ label, open, setOpen, selected, data, field, setForm }: any) => (
    <div className="my-3">
        <label className="text-sm font-medium text-muted-foreground  font-mono mb-1 block">{label}</label>
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" className="w-full justify-between shadow-none font-medium text-muted-foreground">
                    {selected
                        ? data.find((d: any) => d.id === Number(selected))?.user.name
                        : `Search or select a ${field}`}
                    <ChevronsUpDown className="opacity-50 h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder={`Search ${field}...`} />
                    <CommandList>
                        <CommandEmpty>No {field} found.</CommandEmpty>
                        <CommandGroup>
                            {data
                                .filter((item: any) => item.type !== "Generalist")
                                .map((item: any) => (
                                    <CommandItem
                                        key={item.id}
                                        value={item.user.name}
                                        onSelect={() => {
                                            setForm({ target: { name: field, value: String(item.id) } });
                                            setOpen(false);
                                        }}
                                        className="font-mono font-medium text-muted-forground"
                                    >
                                        <Check className={cn("mr-2 h-4 w-4 ", selected === String(item.id) ? "opacity-100" : "opacity-0")} />
                                        {item.user.name} |  {item.type ? item.type + " |" : item.user.email}  {item.department?.name}
                                    </CommandItem>
                                ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    </div>
);

/* DateTimePicker */
const DateTimePicker = ({ form, handleChange, setForm }: any) => {
    const to24h = (hour: number, ampm: string) =>
        ampm === "PM" && hour !== 12 ? hour + 12 : ampm === "AM" && hour === 12 ? 0 : hour;

    const calculateEndTime = (startHour: number, ampm: string, duration: number) => {
        let start24 = to24h(startHour, ampm);
        let end24 = start24 + duration;

        // Validate working hours
        if (start24 < 8 || end24 > 20) {
            toast.error("⏰ Appointment must be within working hours (8 AM – 8 PM)");
            // Reset invalid times
            start24 = Math.max(8, Math.min(start24, 20 - duration));
            end24 = start24 + duration;
        }

        // Convert back to 12h
        const startAmpm = start24 >= 12 ? "PM" : "AM";
        const startHour12 = start24 % 12 || 12;

        const endAmpm = end24 >= 12 ? "PM" : "AM";
        const endHour12 = end24 % 12 || 12;

        return { startHour12, startAmpm, endHour12, endAmpm };
    };


    const handleFieldChange = (e: any) => {
        const { name, value } = e.target;
        const updatedForm = { ...form, [name]: value };

        if (["hour", "ampm", "duration"].includes(name)) {
            const duration = parseInt(updatedForm.duration || "1", 10);
            const { startHour12, startAmpm, endHour12, endAmpm } = calculateEndTime(
                parseInt(updatedForm.hour),
                updatedForm.ampm,
                duration
            );

            updatedForm.hour = startHour12;
            updatedForm.ampm = startAmpm;
            updatedForm.endHour = endHour12;
            updatedForm.endAmpm = endAmpm;
        }

        setForm(updatedForm);
    };


    return (
        <div className="grid md:grid-cols-2 grid-cols-1  gap-4">
            {/* Date */}
            <div>
                <label className="text-sm font-medium text-muted-foreground ">Date</label>
                <Input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleFieldChange}
                    required
                    className="shadow-none font-mono"
                />
            </div>

            {/* Start Time */}
            <div>
                <label className="text-sm font-medium mb-1 block text-muted-foreground">Start Time</label>
                <div className="flex gap-2 border flex justify-center rounded">
                    <select
                        name="hour"
                        value={form.hour}
                        onChange={handleFieldChange}
                        className=" text-mono px-2 py-1"
                        required
                    >
                        {Array.from({ length: 12 }, (_, i) => i + 1)
                            .filter((h) => {
                                // Compute 24h for AM/PM
                                const hour24 = form.ampm === "PM" && h !== 12 ? h + 12 : form.ampm === "AM" && h === 12 ? 0 : h;
                                return hour24 >= 8 && hour24 <= 20; // Only show hours in working range
                            })
                            .map((h) => (
                                <option key={h} value={h} className="font-mono">
                                    {h}
                                </option>
                            ))}
                    </select>

                    <select
                        name="minute"
                        value={form.minute}
                        onChange={handleFieldChange}
                        className=" text-mono px-2 py-1"
                        required
                    >
                        <option value="00">00</option>
                    </select>

                    <select
                        name="ampm"
                        value={form.ampm}
                        onChange={handleFieldChange}
                        className=" text-mono px-2 py-1"
                        required
                    >
                        {/* Only show AM if start hour allows */}
                        {(parseInt(form.hour) < 8 ? [] : ["AM"]).map((a) => (
                            <option key={a} value={a}>
                                {a}
                            </option>
                        ))}
                        {(parseInt(form.hour) > 8 ? ["PM"] : ["PM"]).map((p) => (
                            <option key={p} value={p} className="font-mono">
                                {p}
                            </option>
                        ))}
                    </select>
                </div>
            </div>


            {/* Duration */}
            <div>
                <label className="text-sm font-medium mb-1 block text-muted-foreground font-mono">Duration</label>
                <select
                    name="duration"
                    value={form.duration || "1"}
                    onChange={handleFieldChange}
                    className="border rounded px-2 py-[6px] w-full"
                    required
                >
                    {[1, 2, 3].map((h) => (
                        <option key={h} value={h}>
                            {h} hour{h > 1 ? "s" : ""}
                        </option>
                    ))}
                </select>
            </div>

            {/* End Time */}
            <div>
                <label className="text-sm font-medium mb-1 block text-muted-foreground font-mono">End Time</label>
                <Input
                    readOnly
                    value={`${form.endHour || ""}:00 ${form.endAmpm || ""}`}
                    className="border shadow-none rounded px-2 py-1 bg-gray-100 font-mono"
                />
            </div>
        </div>
    );
};

/* AppointmentSummary */
const AppointmentSummary = ({
    form,
    patients,
    doctors,
    doctorAppointmentsData,
    patientAppointmentsData,
    doctorAppointmentsLoaded,
    patientAppointmentsLoaded,
    formatTime,
    totalCost,
}: any) => {
    const patientName =
        patients.find((p: any) => p.id === Number(form.patient))?.user.name || "—";
    const doctorName =
        doctors.find((d: any) => d.id === Number(form.doctor))?.user.name || "—";

    return (
        <Card className="border  shadow-none bg-white font-mono rounded-md">
            <CardHeader className=" border-b-4 pb-2 border-dashed  ">
                <CardTitle className="text-sm font-semibold text-center tracking-wide uppercase">
                    Appointment Summary
                </CardTitle>
            </CardHeader>

            <CardContent className="text-xs grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-gray-800">
                <p className="text-gray-600">Patient:</p>
                <p className="font-semibold text-gray-900">{patientName}</p>

                <p className="text-gray-600">Doctor:</p>
                <p className="font-semibold text-gray-900">{doctorName}</p>

                <p className="text-gray-600">Date:</p>
                <p className="font-semibold text-gray-900">{form.date || "—"}</p>

                <p className="text-gray-600">Time:</p>
                <p className="font-semibold text-gray-900">
                    {form.hour && form.ampm
                        ? `${form.hour}:${form.minute} ${form.ampm}`
                        : "—"}
                </p>

                <p className="text-gray-600">Duration:</p>
                <p className="font-semibold text-gray-900">{form.duration} hr</p>

                <p className="text-gray-600">Cost:</p>
                <p className="font-semibold text-gray-900">{totalCost} MMK</p>

                <p className="text-gray-600">Description:</p>
                <p className="font-semibold text-gray-900">{form.description || "—"}</p>

                <p className="text-gray-600">Notes:</p>
                <p className="font-semibold text-gray-900">{form.notes || "—"}</p>
            </CardContent>

            {(doctorAppointmentsLoaded && doctorAppointmentsData.length > 0) ||
                (patientAppointmentsLoaded && patientAppointmentsData.length > 0) ? (
                <div className="border-t border-t-dotted grid sm:grid-cols-2 flex justify-center grid-cols-1 mt-3 pt-3 space-y-3 px-4">
                    {doctorAppointmentsLoaded && doctorAppointmentsData.length > 0 && (
                        <ScheduleList
                            title="Doctor’s Schedule"
                            data={doctorAppointmentsData}
                            formatTime={formatTime}
                        />
                    )}
                    {patientAppointmentsLoaded && patientAppointmentsData.length > 0 && (
                        <ScheduleList
                            title="Patient’s Appointments"
                            data={patientAppointmentsData}
                            formatTime={formatTime}
                        />
                    )}
                </div>
            ) : null}
        </Card>
    );
};


/* Schedule List */
const ScheduleList = ({ title, data, formatTime }: any) => (
    <div className="flex justify-center flex-col">
        <h3 className="font-semibold mt-4 text-foreground">{title}</h3>
        <ul className="text-xs text-muted-foreground space-y-1">
            {data.map((a: any, i: number) => (
                <li key={i}>
                    • {new Date(a.date).toLocaleDateString()} — {formatTime(a.date)} ({a.duration} hr)
                </li>
            ))}
        </ul>
    </div>
);
