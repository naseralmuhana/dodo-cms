import Link from "next/link"

import { NAV_MAIN_ITEMS } from "@/constants/nav-main"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"

import { LogoSvg, NavMain } from "./components"

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="animate-slide-right">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex size-8 items-center justify-center rounded-lg">
                  <LogoSvg />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Dodo pizza</span>
                  <span className="truncate text-xs">Simply Delicious</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={NAV_MAIN_ITEMS} label="General" />
      </SidebarContent>
      <SidebarFooter>{/* nav user */}</SidebarFooter>
    </Sidebar>
  )
}
