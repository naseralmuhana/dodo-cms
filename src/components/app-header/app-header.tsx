import { cn } from "@/lib/utils"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

import { AppBreadcrumb, GithubButton, ToggleThemeButton } from "./components"

export function AppHeader() {
  return (
    <header
      className={cn(
        "flex h-14 shrink-0 items-center gap-2 animate-slide-down",
        "sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      )}
    >
      <div className="flex flex-1 items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <AppBreadcrumb />
      </div>
      <div className="ml-auto px-3">
        <GithubButton />
        <ToggleThemeButton />
      </div>
    </header>
  )
}
