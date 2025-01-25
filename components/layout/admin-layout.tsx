import { useState ,useEffect} from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import axios from 'axios';
import {
  BarChart2,
  Users,
  Dumbbell,
  Apple,
  Settings,
  ChevronDown,
  Package,
  Calendar,
  BookOpen,
  ShoppingCart,
  LayoutDashboard,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  submenu?: { title: string; href: string }[]
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    title: "User",
    href: "/admin/users",
    icon: <Users className="w-5 h-5" />,
    submenu: [
      { title: "User List", href: "/admin/users" },
      { title: "Add User", href: "/admin/users/add" },
    ],
  },
  {
    title: "Workout",
    href: "/admin/workouts",
    icon: <Dumbbell className="w-5 h-5" />,
    submenu: [
      { title: "Workout List", href: "/admin/workouts" },
      { title: "Add Workout", href: "/admin/workouts/add" },
    ],
  },
  {
    title: "Diet",
    href: "/admin/diets",
    icon: <Apple className="w-5 h-5" />,
    submenu: [
      { title: "Diet List", href: "/admin/diets" },
      { title: "Add Diet", href: "/admin/diets/add" },
    ],
  },
 
  {
    title: "Blog",
    href: "/admin/blogs",
    icon: <BookOpen className="w-5 h-5" />,
  },

]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<string[]>([])
  const [users,setusers] = useState([])
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)

  const toggleSubmenu = (title: string) => {
    setOpenMenus((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  return (
    <div className="min-h-screen">
      {/* Mobile Menu Button - Only visible on mobile */}
      <Button 
        variant="ghost"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setShowMobileSidebar(!showMobileSidebar)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Sidebar - Changes position based on screen size */}
      <div className={`
        fixed inset-y-0 left-0 z-40
        transform transition-transform duration-200 ease-in-out
        w-64 bg-background border-r
        md:relative md:translate-x-0
        ${showMobileSidebar ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-24%20215801-Z6x90m0gAGUBfuINj0jFSZVYrUntg9.png"
              alt="Fitness Logo"
              className="h-8"
            />
            <span className="font-semibold text-xl">Fitness</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.title}>
                {item.submenu ? (
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      className={cn("w-full justify-between", pathname.startsWith(item.href) && "bg-accent")}
                      onClick={() => toggleSubmenu(item.title)}
                    >
                      <span className="flex items-center gap-2">
                        {item.icon}
                        {item.title}
                      </span>
                      <ChevronDown
                        className={cn("w-4 h-4 transition-transform", openMenus.includes(item.title) && "rotate-180")}
                      />
                    </Button>
                    {openMenus.includes(item.title) && (
                      <ul className="pl-6 space-y-2">
                        {item.submenu.map((subitem) => (
                          <li key={subitem.title}>
                            <Link
                              href={subitem.href}
                              className={cn(
                                "block px-4 py-2 rounded-md hover:bg-accent text-sm",
                                pathname === subitem.href && "bg-accent",
                              )}
                            >
                              {subitem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-md hover:bg-accent",
                      pathname === item.href && "bg-accent",
                    )}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content - Adjusts margin based on sidebar visibility */}
      <main className={`
        transition-margin duration-200 ease-in-out
        md:ml-64
      `}>
        <header className="h-16 border-b bg-background flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-24%20215654-5IAhW2Ea5MCa8EHdvrdaeJT0iZSWxk.png"
              alt="Admin"
              className="w-8 h-8 rounded-full border"
            />
          </div>
        </header>
        <div className="p-6">{children}</div>
      </main>

      {/* Overlay for mobile - Only visible when sidebar is open */}
      {showMobileSidebar && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setShowMobileSidebar(false)}
        />
      )}
    </div>
  )
}

