"use client"
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAppointmentsStatusQuery, useGetSummaryQuery } from "@/app/store/features/analysis/analysisApi";
import LoadingPills from "./loading";
export function SectionCards() {
  // Fetch summary and appointments data from backend
  const { data: summary, isLoading: summaryLoading } = useGetSummaryQuery();
  const { data: appointmentsStatus } = useGetAppointmentsStatusQuery();

  // While loading, show placeholder or zero
  const stats = [
    {
      title: "Total Patients",
      value: summary?.patientsCount ?? 0,
      change: ((summary?.patientsCount ?? 0) / 100), 
      trend: "up",
      description: "Total Patients Register",
      subtext: "Visitors for the last 6 months",
      bg: "bg-black",
    },
    {
      title: "Total Doctors",
      value: summary?.doctorsCount ?? 0,
      change: ((summary?.doctorsCount ?? 0) / 100),
      trend: "up",
      description: "Total Doctor Register",
      subtext: "Comfined By System Admin",
      bg: "bg-white/80",
    },
    {
      title: "Total Appointments",
      value: summary?.appointmentsCount ?? 0,
      change: ((summary?.appointmentsCount ?? 0) / 100),
      trend: "up",
      description: "Appointments are increasing",
      subtext: "Based On All Appointments",
      bg: "bg-white/80",
    },
    {
      title: "Total Files",
      value: summary?.filesCount ?? 0,
      change:((summary?.filesCount ?? 0) / 100),
      trend: "up",
      description: "File uploads are growing",
      subtext: "Storage activity",
      bg: "bg-white/80",
    },
  ];

  if (summaryLoading) return <div><LoadingPills message="Loading Analysis"/></div>;

  return (
    <div className="*:data-[slot=card]:bg-muted *:data-[slot=card]:rounded-md *:data-[slot=card]:border *:data-[slot=card]:shadow-none hover:bg-white/50 grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {stats.map((stat, i) => (
        <Card key={i} className={`${stat.bg} rounded-md shadow-sm`}>
          <CardHeader>
            <CardDescription>{stat.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {stat.value}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                {stat.trend === "up" ? <IconTrendingUp /> : <IconTrendingDown />}
                {stat.change}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {stat.description}{" "}
              {stat.trend === "up" ? (
                <IconTrendingUp className="size-4" />
              ) : (
                <IconTrendingDown className="size-4" />
              )}
            </div>
            <div className="text-muted-foreground">{stat.subtext}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
