import { ChartsGrid } from "@/components/ui/charts-grid";
import { DashboardHeader } from "@/components/ui/dashboard-header";
import { MetricsGrid } from "@/components/ui/metrics-grid";


export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-6 py-8 space-y-8">
        <MetricsGrid />
        <ChartsGrid />
      </main>
    </div>
  )
}
