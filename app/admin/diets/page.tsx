"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Plus } from "lucide-react"
import AdminLayout from "@/components/layout/admin-layout"

const columns = [
  { key: "no", title: "No", sortable: true },
  { key: "title", title: "Title", sortable: true },
  { key: "category", title: "Category Diet", sortable: true },
  { key: "calories", title: "Calories", sortable: true },
  { key: "carbs", title: "Carbs", sortable: true },
  { key: "protein", title: "Protein", sortable: true },
  { key: "fat", title: "Fat", sortable: true },
  { key: "servings", title: "Servings", sortable: true },
  { key: "totalTime", title: "Total Time", sortable: true },
  { key: "featured", title: "Featured" },
  { key: "status", title: "Status" },
]

const mockDiets = [
  {
    no: 1,
    title: "Exemple 1",
    category: "Diète XXX",
    calories: "5000",
    carbs: "100",
    protein: "200",
    fat: "10",
    servings: "5",
    totalTime: "24",
    featured: "yes",
    status: "Active",
  },
  // Add more mock data as needed
]

export default function DietsPage() {
  const [diets, setDiets] = useState(mockDiets)

  const handleEdit = (diet: any) => {
    // Implement edit functionality
    console.log("Edit diet:", diet)
  }

  const handleDelete = (diet: any) => {
    // Implement delete functionality
    setDiets(diets.filter((d) => d.no !== diet.no))
  }

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Diet List</h2>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Diet
          </Button>
        </div>
        <DataTable columns={columns} data={diets} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </AdminLayout>
  )
}

