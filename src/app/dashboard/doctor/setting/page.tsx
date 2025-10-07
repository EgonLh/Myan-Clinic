"use client";

import { Sidebar } from "@/components/doctors/siderbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Stethoscope, User } from "lucide-react";
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
      console.error("Update failed:", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background text-foreground">
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

      <main className="flex-1 md:ml-64 p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-2xl font-bold">Settings</h1>
          <div className="flex gap-2">
            <Button onClick={() => setEditMode(!editMode)} variant="outline">
              {editMode ? "Cancel" : "Edit Profile"}
            </Button>
            {editMode && (
              <Button onClick={() => setDialogOpen(true)}>
                Save Changes
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border rounded-md shadow-sm hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" /> Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      value={formData.name}
                      readOnly={!editMode}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Username</Label>
                    <Input
                      value={formData.username}
                      readOnly={!editMode}
                      onChange={(e) => handleChange("username", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={formData.email} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      value={formData.phone}
                      readOnly={!editMode}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Input value={doctor.department?.name || ""} readOnly />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Info Sidebar */}
          <div className="space-y-6">
            <Card className="border rounded-md shadow-sm hover:shadow-md transition-all overflow-hidden">
              {/* Cover Gradient */}
              <div className="h-28 w-full bg-gradient-to-r from-red-500 via-pink-500 to-blue-600 relative">
                {/* Optional subtle noise */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
                  }}
                />
              </div>

              {/* Card Header */}
              <CardHeader className="pt-4">
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5" /> Quick Info
                </CardTitle>
              </CardHeader>

              {/* Card Content */}
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                {[
                  { label: "Email", value: doctor.user.email },
                  { label: "Phone", value: doctor.ph },
                  { label: "Department", value: doctor.department?.name },
                  { label: "Status", value: doctor.user.status },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{item.label}</span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </CardContent>

              {/* Footer: Copy Email */}
              <div className="border-t px-4 py-2 flex justify-end">
                <Button
                  size="sm"
                  variant="outline"
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
