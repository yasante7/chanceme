"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { 
  LayoutDashboard, 
  User, 
  Settings, 
  GraduationCap, 
  BookOpen, 
  FileText,
  Calendar,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

type NavItem = {
  name: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

type NavGroup = {
  [key: string]: NavItem[];
}

export function DashboardSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false);

  const navItems: NavGroup[] = [
    {
      "Dashboard":[
        {
          name: "Overview",
          href: "/dashboard",
          icon: LayoutDashboard
        },
        {
          name: "My Profile",
          href: "/dashboard/profile",
          icon: User
        },
        {
          name: "Applications",
          href: "/dashboard/applications",
          icon: FileText
        },
        {
          name: "Schedule",
          href: "/dashboard/schedule",
          icon: Calendar
        },
        {
          name: "Qualified Programs",
          href: "../dashboard/recommendations",
          icon: GraduationCap
        },
        {
          name: "Compare Schools",
          href: "/dashboard/compare-schools",
          icon: FileText
        },
      ]
    },
    {
      "Community":[
        {
          name: "Resources",
          href: "/dashboard/resources",
          icon: BookOpen
        },
        {
          name: "Messages",
          href: "/dashboard/messages",
          icon: FileText
        }
      ]
    },
    {
      "Settings":[
        {
          name: "Settings",
          href: "/dashboard/settings",
          icon: Settings
        }
      ]
    }
  ]

  const sidebarContent = (
    <div className="p-6">
      <nav className="space-y-6">
        {navItems.map((group, groupIndex) => {
          // Get the category name (the key of the object)
          const categoryName = Object.keys(group)[0];
          // Get the list of items in this category
          const items = group[categoryName];
          
          return (
            <div key={groupIndex} className={groupIndex > 0 ? "mt-6" : ""}>
              <h2 className="text-sm font-semibold mb-2 text-muted-foreground">{categoryName}</h2>
              <div className="space-y-1">
                {items.map((item) => {         
                  const isActive = (() => {
                    if (item.href === "/dashboard") {
                      return pathname === "/dashboard" || pathname === "/dashboard/";
                    }
                    // For other paths, check if the current path starts with the nav item path
                    return pathname.startsWith(item.href);
                  })();

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        isActive 
                          ? "bg-primary/10 text-primary" 
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                      onClick={() => setOpen(false)} // close sidebar on link click
                    >
                      <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-card border-r fixed top-0 h-screen overflow-y-auto pt-16">
        {sidebarContent}
      </aside>
      {/* Mobile sidebar trigger */}
      <div className="fixed top-100 left-0 z-0 md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className="flex items-center justify-center w-6 h-10 rounded-full bg-primary text-black shadow-lg"
              aria-label="Open sidebar"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-10">
            {sidebarContent}
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}