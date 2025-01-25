"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Edit2, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import AdminLayout from "@/components/layout/admin-layout"

interface Blog {
  no: number
  title: string
  featured: boolean
  status: "Publish" | "Draft"
  createdDate: string
  updatedDate: string
}

const initialBlogs: Blog[] = [
  {
    no: 1,
    title: "How To Fix Muscle Imbalances",
    featured: true,
    status: "Publish",
    createdDate: "September 30, 2023 11:17 AM",
    updatedDate: "October 7, 2024 6:46 AM",
  },
  // Add more mock data as needed
]

export default function BlogsPage() {
  const router = useRouter()
  const [blogs, setBlogs] = useState(initialBlogs)
  const [deleteBlog, setDeleteBlog] = useState<Blog | null>(null)

  const columns = [
    { key: "no", title: "No", sortable: true },
    { key: "title", title: "Title", sortable: true },
    {
      key: "featured",
      title: "Featured",
      render: (blog: Blog) => (blog.featured ? "yes" : "no"),
    },
    {
      key: "status",
      title: "Status",
      render: (blog: Blog) => <StatusBadge status={blog.status} />,
    },
    { key: "createdDate", title: "Created Date", sortable: true },
    { key: "updatedDate", title: "Updated Date", sortable: true },
    {
      key: "actions",
      title: "Actions",
      render: (blog: Blog) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.push(`/admin/blogs/${blog.no}/edit`)}>
            <Edit2 className="h-4 w-4 text-green-500" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setDeleteBlog(blog)}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ),
    },
  ]

  const handleDelete = () => {
    if (deleteBlog) {
      setBlogs(blogs.filter((b) => b.no !== deleteBlog.no))
      setDeleteBlog(null)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Blog List</h2>
          <Button onClick={() => router.push("/admin/blogs/add")}>
            <Plus className="h-4 w-4 mr-2" />
            Add Blog
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={blogs}
          onEdit={(blog) => router.push(`/admin/blogs/${blog.no}/edit`)}
          onDelete={(blog) => setDeleteBlog(blog)}
        />

        <ConfirmDialog
          open={!!deleteBlog}
          onOpenChange={() => setDeleteBlog(null)}
          onConfirm={handleDelete}
          title="Delete Blog"
          description="Are you sure you want to delete this blog post? This action cannot be undone."
        />
      </div>
    </AdminLayout>
  )
}

