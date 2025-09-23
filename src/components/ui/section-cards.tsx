import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
const stats = [
  {
    title: "Total Patients",
    value: "$1,250.00",
    change: "+12.5%",
    trend: "up",
    description: "Trending up this month",
    subtext: "Visitors for the last 6 months",
    bg: "bg-black ", // override style if needed
  },
  {
    title: "Total Doctors",
    value: "1,234",
    change: "-20%",
    trend: "down",
    description: "Down 20% this period",
    subtext: "Acquisition needs attention",
    bg: "bg-white/80", // muted background
  },
  {
    title: "Active Patients",
    value: "45,678",
    change: "+12.5%",
    trend: "up",
    description: "Strong user retention",
    subtext: "Engagement exceed targets",
    bg: "bg-white/80",
  },
  {
    title: "Growth Rate",
    value: "4.5%",
    change: "+4.5%",
    trend: "up",
    description: "Steady performance increase",
    subtext: "Meets growth projections",
    bg: "bg-white/80",
  },
]

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:bg-muted *:data-[slot=card]:rounded-md *:data-[slot=card]:border *:data-[slot=card]:shadow-none hover:bg-whtie/50 grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">

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
  )
}
