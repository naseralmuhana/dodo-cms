import { IconType } from "@/types"

// Function to generate a navigation item
export const createNavItem = (
  title: string,
  url: string,
  icon: IconType
): { title: string; url: string; icon: IconType } => ({
  title,
  url,
  icon: { name: icon.name, props: icon.props }
})

// Main navigation items
export const NAV_MAIN_ITEMS = [
  createNavItem("dashboard", "/", { name: "LayoutDashboard" }),
  createNavItem("categories", "/categories", { name: "Tag" }),
  createNavItem("ingredients", "/ingredients", { name: "Utensils" }),
  createNavItem("products", "/products", { name: "Pizza" }),
  createNavItem("types", "/types", { name: "Grid3x3" }),
  createNavItem("sizes", "/sizes", { name: "Expand" })
]
