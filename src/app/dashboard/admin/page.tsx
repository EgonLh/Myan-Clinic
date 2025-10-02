import { AppointmentTable } from "@/components/ui/data-table"
import { SectionCards } from "@/components/ui/section-cards"

import data from "./data.json"

// For Admin Dashboard
export default function Page() {
  return (
     <>
      <SectionCards />
      <div className="px-4 lg:px-6">
      </div>
      <div className="mx-2">
        <AppointmentTable  />
      </div>
    </>
  )
}
