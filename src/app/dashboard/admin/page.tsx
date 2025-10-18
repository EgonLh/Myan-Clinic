// ---------- Main Page for Admin ---------- //
// - Review [x]

import { AppointmentTable } from "@/components/ui/data-table"
import { SectionCards } from "@/components/ui/section-cards"

export default function Page() {
  return (
    <>
      {/* ---------- Cards about Analysis ---------- */}
      <SectionCards />
      <div className="px-4 lg:px-6">
      </div>
      {/* ---------- DataTabe About Appointments ---------- */}
      <div className="mx-2">
        <AppointmentTable />
      </div>
    </>
  )
}
