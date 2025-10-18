import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MoreHorizontal } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="border-b border-border border-dashed border-b-2 ">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground font-mono">Analytics Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Monitor your application performance and user engagement
            </p>
          </div>

          
        </div>
      </div>
    </header>
  )
}
