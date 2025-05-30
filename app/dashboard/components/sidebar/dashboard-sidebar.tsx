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
} from "lucide-react"
import { cn } from "@/lib/utils"

type NavItem = {
  name: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

type NavGroup = {
  [key: string]: NavItem[];
}

export function useSidebarContent(setOpen?: (open: boolean) => void) {
  const pathname = usePathname()

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

  return (
    <div className="p-6">
      <nav className="space-y-6">
        {navItems.map((group, groupIndex) => {
          const categoryName = Object.keys(group)[0];
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
                      onClick={() => setOpen && setOpen(false)}
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
}

// Desktop sidebar only
export function DashboardSidebar() {
  const sidebarContent = useSidebarContent();
  return (
    <aside className="hidden md:flex flex-col w-64 bg-card border-r fixed top-0 h-screen overflow-y-auto pt-16">
      {sidebarContent}
    </aside>
  );
}