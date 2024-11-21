"use client"

import { ComponentPropsWithoutRef } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { capitalizeFirstLetter } from "@/lib/capitalize-first-letter"

import { IconType } from "@/types"

import { CreateIcon } from "@/components/create-icon"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar"

interface navMain extends ComponentPropsWithoutRef<typeof SidebarGroup> {
  items: {
    title: string
    url: string
    icon: IconType
  }[]
  label?: string
}

export const NavMain = ({ items, label, ...props }: navMain) => {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()

  return (
    <SidebarGroup {...props}>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(({ icon, title, url }, index) => (
            <SidebarMenuItem key={`${title}-${index}`}>
              <SidebarMenuButton
                asChild
                tooltip={capitalizeFirstLetter(title)}
                isActive={pathname === url}
                onClick={() => setOpenMobile(false)}
              >
                <Link href={url}>
                  <CreateIcon icon={{ name: icon.name, props: icon.props }} />
                  <span>{capitalizeFirstLetter(title)}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
