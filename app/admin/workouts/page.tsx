"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Edit2, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import AdminLayout from "@/components/layout/admin-layout"

interface Workout {
  no: number
  title: string
  level: string
  workoutType: string
  status: "Active" | "Inactive"
  createdDate: string
  updatedDate: string
}

const initialWorkouts: Workout[] = [
  {
    no: 1,
    title: "pelito 3",
    level: "Hard",
    workoutType: "Sesiones",
    status: "Active",
    createdDate: "January 7, 2025 9:31 AM",
    updatedDate: "January 7, 2025 9:31 AM",
  },
  // Add more mock data as needed
]

export default function WorkoutsPage() {
  const router = useRouter()
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const [deleteWorkout, setDeleteWorkout] = useState<Workout | null>(null)

  const columns = [
    { key: "no", title: "No", sortable: true },
    { key: "title", title: "Title", sortable: true },
    { key: "level", title: "Level", sortable: true },
    { key: "workoutType", title: "Workout Type", sortable: true },
    {
      key: "status",
      title: "Status",
      render: (workout: Workout) => <StatusBadge status={workout.status} />,
    },
    { key: "createdDate", title: "Created Date", sortable: true },
    { key: "updatedDate", title: "Updated Date", sortable: true },
    {
      key: "actions",
      title: "Actions",
      render: (workout: Workout) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.push(`/admin/workouts/${workout.no}/edit`)}>
            <Edit2 className="h-4 w-4 text-green-500" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setDeleteWorkout(workout)}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ),
    },
  ]

  const handleDelete = () => {
    if (deleteWorkout) {
      setWorkouts(workouts.filter((w) => w.no !== deleteWorkout.no))
      setDeleteWorkout(null)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Workout List</h2>
          <Button onClick={() => router.push("/admin/workouts/add")}>
            <Plus className="h-4 w-4 mr-2" />
            Add Workout
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={workouts}
          onEdit={(workout) => router.push(`/admin/workouts/${workout.no}/edit`)}
          onDelete={(workout) => setDeleteWorkout(workout)}
        />

        <ConfirmDialog
          open={!!deleteWorkout}
          onOpenChange={() => setDeleteWorkout(null)}
          onConfirm={handleDelete}
          title="Delete Workout"
          description="Are you sure you want to delete this workout? This action cannot be undone."
        />
      </div>
    </AdminLayout>
  )
}

