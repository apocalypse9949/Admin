"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Plus } from "lucide-react"
import AdminLayout from "@/components/layout/admin-layout"
import { ScrollArea } from "@/components/ui/scroll-area"
import axios from 'axios'

const columns = [
  { 
    key: "_id", 
    title: "User ID", 
    sortable: true,
    className: "hidden md:table-cell" // Hide on mobile
  },
  { 
    key: "name", 
    title: "Name", 
    sortable: true 
  },
  { 
    key: "email", 
    title: "Email", 
    sortable: true,
    className: "hidden sm:table-cell" // Hide on small mobile
  },
  { 
    key: "age", 
    title: "Age", 
    sortable: true,
    className: "hidden sm:table-cell"
  },
  { 
    key: "weight", 
    title: "Weight", 
    sortable: true,
    className: "hidden lg:table-cell"
  },
  { 
    key: "height", 
    title: "Height (cm)", 
    sortable: true,
    className: "hidden lg:table-cell"
  },
  { 
    key: "activityLevel", 
    title: "Activity Level", 
    sortable: true,
    className: "hidden xl:table-cell"
  },
  { 
    key: "medicalHistory", 
    title: "Medical History",
    className: "hidden xl:table-cell"
  },
  { 
    key: "fitnessGoals", 
    title: "Fitness Goals",
    className: "hidden xl:table-cell"
  }
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
        const respo = await axios.get("https://hms-da9g.onrender.com/getAllUsers")
        setUsers(respo.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  }, []) // Added dependency array to prevent infinite loop

  return (
    <AdminLayout>
      <div className="space-y-4 p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold">User List</h2>
          <Button size="sm" className="whitespace-nowrap">
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
        <ScrollArea className="rounded-md border">
          <div className="h-[calc(100vh-12rem)]">
            <DataTable 
              columns={columns} 
              data={users} 
              className="w-full"
            />
          </div>
        </ScrollArea>
      </div>
    </AdminLayout>
  )
}
