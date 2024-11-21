import { createElement } from "react"

import * as Icons from "lucide-react"

import { IconType } from "@/types"

interface CreateIconProps {
  icon: IconType
}

export function CreateIcon({ icon }: CreateIconProps) {
  const IconComponent = Icons[icon.name] as Icons.LucideIcon

  return createElement(IconComponent, {
    ...icon.props
  })
}
