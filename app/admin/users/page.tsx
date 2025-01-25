"use client"

import { useState,useEffect} from "react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Plus } from "lucide-react"
import AdminLayout from "@/components/layout/admin-layout"
import axios from 'axios'
const columns = [
  { key: "_id", title: "User ID", sortable: true },
  { key: "name", title: "Name", sortable: true },
  { key: "email", title: "Email", sortable: true },
  { key: "age", title: "Age", sortable: true },
  { key: "weight", title: "Weight", sortable: true },
  { key: "height", title: "Height (cm)", sortable: true },
  { key: "activityLevel", title: "Activity Level", sortable: true },
  { key: "medicalHistory", title: "Medical History" },
  { key: "fitnessGoals", title: "Fitness Goals" },
  
]

const mockUsers = [
  {
    _id: "6793c91ca76a83588ab50716",
    name: "Jashwanth",
    email: "vjash2005@gmail.com",
    password: "jsasd",
    age: 29,
    weight: [75],
    height: 173.7,
    activityLevel: "Moderate",
    medicalHistory: ["None"],
    fitnessGoals: ["Weight Loss"],
    __v: 0,
  },
  // Add more mock data as needed
]

export default function UsersPage() {
  const [users, setUsers] = useState([])

  const handleEdit = (user) => {
    // Implement edit functionality
    console.log("Edit user:", user)
  }

  const handleDelete = (user) => {
    // Implement delete functionality
    setUsers(users.filter((u) => u._id !== user._id))
  }

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        
        const respo = await axios.get("https://hms-da9g.onrender.com/getAllUsers"); // Add your actual API URL here
        setUsers(respo.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData()
  })
  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">User List</h2>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
        <DataTable columns={columns} data={users}  />
      </div>
    </AdminLayout>
  )
}
