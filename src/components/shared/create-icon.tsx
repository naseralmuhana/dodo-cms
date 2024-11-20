import { createElement } from "react"

import { IconType } from "@/types"
import * as Icons from "lucide-react"

interface CreateIconProps {
  icon: IconType
}

export function CreateIcon({ icon }: CreateIconProps) {
  const IconComponent = Icons[icon.name] as Icons.LucideIcon

  return createElement(IconComponent, {
    ...icon.props
  })
}
