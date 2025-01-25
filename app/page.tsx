"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2, Users, Dumbbell, Apple, Activity, Target, Clock, Zap } from "lucide-react"
import AdminLayout from "@/components/layout/admin-layout"
import { DataTable } from "@/components/ui/data-table"

// Analytics Card Component
function AnalyticsCard({
  title,
  value,
  icon,
  description,
}: {
  title: string
  value: string | number
  icon: React.ReactNode
  description?: string
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  )
}

// Recent Activity Component
function RecentActivity() {
  const columns = [
    { key: "user", title: "User" },
    { key: "action", title: "Action" },
    { key: "time", title: "Time" },
  ]

  const activities = [
    {
      user: "DEEPAKRAJA C",
      action: "Created new workout",
      time: "5 minutes ago",
    },
    {
      user: "Attila Vidus",
      action: "Updated diet plan",
      time: "10 minutes ago",
    },
    {
      user: "Mahmoud Gamil",
      action: "Completed workout",
      time: "15 minutes ago",
    },
  ]

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={activities} searchable={false} />
      </CardContent>
    </Card>
  )
}

// Performance Metrics Component
function PerformanceMetrics() {
  const columns = [
    { key: "metric", title: "Metric" },
    { key: "value", title: "Value" },
    { key: "change", title: "Change" },
  ]

  const metrics = [
    {
      metric: "Active Users",
      value: "1,234",
      change: "+12%",
    },
    {
      metric: "Workout Completion Rate",
      value: "85%",
      change: "+5%",
    },
    {
      metric: "Average Session Duration",
      value: "45 mins",
      change: "+3%",
    },
  ]

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={metrics} searchable={false} />
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

        {/* Analytics Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <AnalyticsCard
            title="Total Users"
            value="1,234"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
            description="+20.1% from last month"
          />
          <AnalyticsCard
            title="Active Workouts"
            value="23"
            icon={<Activity className="h-4 w-4 text-muted-foreground" />}
            description="12 completed today"
          />
          <AnalyticsCard
            title="Total Equipment"
            value="18"
            icon={<Dumbbell className="h-4 w-4 text-muted-foreground" />}
            description="3 added this week"
          />
          <AnalyticsCard
            title="Active Diet Plans"
            value="45"
            icon={<Apple className="h-4 w-4 text-muted-foreground" />}
            description="15 updated recently"
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <AnalyticsCard
            title="Exercise Types"
            value="28"
            icon={<Target className="h-4 w-4 text-muted-foreground" />}
          />
          <AnalyticsCard title="Workout Types" value="9" icon={<Zap className="h-4 w-4 text-muted-foreground" />} />
          <AnalyticsCard title="Body Parts" value="16" icon={<Activity className="h-4 w-4 text-muted-foreground" />} />
          <AnalyticsCard
            title="Average Session"
            value="45 min"
            icon={<Clock className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        {/* Activity and Performance */}
        <div className="grid gap-4">
          <RecentActivity />
          <PerformanceMetrics />
        </div>
      </div>
    </AdminLayout>
  )
}

