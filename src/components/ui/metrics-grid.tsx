"use client"
import { useGetSummaryQuery } from "@/app/store/features/analysis/analysisApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, Users, Activity, DollarSign, TrendingUp } from "lucide-react"

export function MetricsGrid() {
  const { data: summary, isLoading, isError } = useGetSummaryQuery();

  if (isLoading) return <p>Loading metrics...</p>;
  if (isError || !summary) return <p>Failed to load metrics.</p>;

  // Map backend data to the metric cards
  const metrics = [
    {
      title: "Total Patients",
      value: summary.patientsCount.toString(),
      change: "+5.2%", // could be calculated dynamically later
      trend: "up",
      icon: Users,
      description: "Registered patients in the system",
    },
    {
      title: "Total Doctors",
      value: summary.doctorsCount.toString(),
      change: "+2.8%",
      trend: "up",
      icon: Activity,
      description: "Doctors active in the clinic",
    },
    {
      title: "Appointments",
      value: summary.appointmentsCount.toString(),
      change: "-1.1%",
      trend: "down",
      icon: DollarSign,
      description: "Appointments in the current period",
    },
    {
      title: "Files Stored",
      value: summary.filesCount.toString(),
      change: "+4.0%",
      trend: "up",
      icon: TrendingUp,
      description: "Medical files stored securely",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        const isPositive = metric.trend === "up";

        return (
          <Card key={metric.title} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <div className="flex items-center text-xs mt-1">
                {isPositive ? (
                  <ArrowUpIcon className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <ArrowDownIcon className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={isPositive ? "text-green-500" : "text-red-500"}>{metric.change}</span>
                <span className="text-muted-foreground ml-1">from last period</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{metric.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
