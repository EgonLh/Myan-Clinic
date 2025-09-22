import { ChartsGrid } from "@/components/charts-grid";
import { DashboardHeader } from "@/components/dashboard-header";
import { MetricsGrid } from "@/components/metrics-grid";


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
