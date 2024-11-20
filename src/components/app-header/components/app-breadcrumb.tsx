"use client"

import { Fragment, useMemo } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { capitalizeFirstLetter } from "@/lib/capitalize-first-letter"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"

export function AppBreadcrumb() {
  const pathName: string = usePathname()

  // Memoize the pathList to avoid recalculating it on each render
  const pathList = useMemo(() => {
    return pathName.split("/").filter(Boolean) // Filter out empty strings (e.g., trailing slashes)
  }, [pathName])

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* If pathList is empty, show Dashboard */}
        {pathList.length === 0 ? (
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        ) : (
          // Otherwise, generate breadcrumbs for the path segments
          pathList.map((path, index) => {
            const href = `/${pathList.slice(0, index + 1).join("/")}`
            const label = capitalizeFirstLetter(path)
            const isLastPath = pathList.length - 1 === index
            return (
              <Fragment key={index}>
                <BreadcrumbItem className="hidden md:block">
                  {isLastPath ? (
                    <BreadcrumbPage>{label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={href}>{label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLastPath && (
                  <BreadcrumbSeparator className="hidden md:block" />
                )}
              </Fragment>
            )
          })
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
