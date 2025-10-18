//* ----- Analysis Page  ----- *//
// - Review [x]
import { ChartsGrid } from "@/components/ui/charts-grid";
import { DashboardHeader } from "@/components/ui/dashboard-header";
import { MetricsGrid } from "@/components/ui/metrics-grid";


export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ----- Header Information of Analysis ----- */}
      <DashboardHeader />
      <main className="container mx-auto px-6 py-8 space-y-8">
      {/* ----- State Cards ----- */}
        <MetricsGrid />
      {/* ----- Chart Grids ----- */}
        <ChartsGrid />
      </main>
    </div>
  )
}
