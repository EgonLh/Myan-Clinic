"use client";

import { Sidebar } from "@/components/doctors/siderbar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Edit2, Stethoscope, User, UserCheck, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetDoctorByIdQuery, useUpdateDoctorMutation } from "@/app/store/features/doctor/doctorApi";
import { RootState } from "@/app/store/store";
import { useUpdateUserMutation } from "@/app/store/features/users/userApi";
import LoadingPills from "@/components/ui/loading";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const doctorData = useSelector((state: RootState) => state.doctor?.data);
  const doctorId = doctorData?.id || "";

  const { data: doctor, isLoading } = useGetDoctorByIdQuery(Number(doctorId));

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });

  const [updateUser] = useUpdateUserMutation();
  const [updateDoctor] = useUpdateDoctorMutation();

  useEffect(() => {
    if (doctor) {
      setFormData({
        name: doctor.user.name || "",
        username: doctor.user.username || "",
        email: doctor.user.email || "",
        phone: doctor.ph || "",
      });
    }
  }, [doctor]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingPills message="Loading doctor information..." />
      </div>
    );
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      if (!doctor) return;

      // Update user first
      await updateUser({
        id: doctor.user.id,
        body: {
          name: formData.name,
          username: formData.username,
          email: formData.email,
        },
      });

      // Update doctor phone
      await updateDoctor({
        id: doctorId,
        body: { ph: formData.phone },
      });

      setEditMode(false);
      setDialogOpen(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background text-foreground  flex justify-center">
      {/* Sidebar */}
      <div
        className={`fixed z-20 inset-y-0 left-0 w-64 bg-background transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 ease-in-out border-r`}
      >
        <Sidebar />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1  max-w-[80rem] md:ml-64 p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            {editMode ? <><p className="text-xs font-mono text-muted-foreground">Now You Can Edit in Profile Information</p></> :
            
            <p className="text-xs font-mono text-muted-foreground">Update your personal information by click the icon</p>
            
            
            }
          </div>
          <div className="flex gap-2 justify-end md:w-fit w-full ">
            <Button onClick={() => setEditMode(!editMode)} variant="default" size={"sm"}>
              {editMode ? <X className="w-4 h-5" /> : <Edit2 className="w-4 h-5" />}
            </Button>
            {editMode && (
              <Button variant={"default"} onClick={() => setDialogOpen(true)} size={"sm"}>
                Save Changes
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2 space-y-6 order-1">
            <Card className="border rounded-md shadow-none transition-all">
              <CardHeader>
                <CardTitle className="flex items-center font-mono gap-2">
                  <UserCheck className="h-5 w-5 " /> Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-mono text-muted-foreground text-xs">Full Name :</Label>
                    <Input
                      className="shadow-none font-mono"
                      value={formData.name}
                      readOnly={!editMode}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-mono text-muted-foreground text-xs">Role :</Label>
                    <Input className="shadow-none bg-slate-100 font-mono " value={doctor?.type || ""} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-mono text-muted-foreground text-xs">Username :</Label>
                    <Input
                      className="shadow-none  font-mono"
                      value={formData.username}
                      readOnly={!editMode}
                      onChange={(e) => handleChange("username", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-mono text-muted-foreground text-xs">Email :</Label>
                    <Input className="shadow-none bg-slate-100 font-mono" value={formData.email} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-mono text-muted-foreground text-xs">Phone :</Label>
                    <Input className="shadow-none font-mono"
                      value={formData.phone}
                      readOnly={!editMode}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-mono text-muted-foreground text-xs">Department :</Label>
                    <Input className="shadow-none bg-slate-100 font-mono " value={doctor?.department?.name || ""} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-mono text-muted-foreground text-xs">Lincense :</Label>
                    <Input className="shadow-none bg-slate-100 font-mono " value={doctor?.license || ""} readOnly />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-mono text-muted-foreground text-xs">Appointment Count :</Label>
                    <Input type="Number" className="shadow-none bg-slate-100 font-mono " value={doctor?.schedule?.length || ""} readOnly />
                  </div>

                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-end gap-1 px-4 py-2">
                <div className="font-mono font-mono"> <p className="text-xs font-mono text-gray-700">Logged in as: {doctor?.user?.name || "Unknown User"}</p>
                  <p className="text-xs text-gray-500">{doctor?.user?.email || "No email provided"}</p></div>
              </CardFooter>

            </Card>
          </div>

          {/* Quick Info Sidebar */}
          <div className="space-y-6 order-0">
            <Card className="border shadow-none rounded-md p-0 transition-all overflow-hidden">
              {/* Cover Gradient */}
              <div className="md:h-35 h-20 w-full bg-gradient-to-r from-red-500 via-pink-500 via-green-400 to-blue-600 relative">
                {/* Optional subtle noise */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1' numOctaves='5'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  }}
                />
              </div>


              {/* Card Header */}
              <CardHeader className="pt-4">
                <CardTitle className="flex items-center font-mono gap-2">
                  <Stethoscope className="h-5 w-5" /> Quick Info
                </CardTitle>
              </CardHeader>

              {/* Card Content */}
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                {[
                  { label: "Email", value: doctor.user.email },
                  { label: "Username", value: doctor.user.name },
                  { label: "Phone", value: doctor.ph },
                  { label: "Lincense", value: doctor?.license },
                  { label: "Department", value: doctor.department?.name },
                  { label: "Status", value: doctor.user.status },
                ].map((item, idx) => (
                  <div key={idx} className="flex text-xs justify-between">
                    <span className="font-mono ">{item.label}</span>
                    <span className="font-medium font-mono">{item.value}</span>
                  </div>
                ))}
              </CardContent>

              {/* Footer: Copy Email */}
              <div className="border-t-2 border-dashed px-4 py-2 flex justify-end">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs"
                  onClick={() => navigator.clipboard.writeText(doctor.user.email)}
                >
                  Copy Email
                </Button>
              </div>
            </Card>
          </div>


        </div>
      </main>

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Update</DialogTitle>
          </DialogHeader>
          <p className="py-2">
            Are you sure you want to save these changes?
          </p>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
