// ------ Header for Analysis Page ----- //
// - Review [x]
export function DashboardHeader() {
  return (
    <header className="  ">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground font-mono">Analytics Overview</h1>
            <p className="text-sm text-muted-foreground font-mono tracking-wide mt-1">
              Monitor Overview of The System Including Total Doctors , Patients and Departments Overviews
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
