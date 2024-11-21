import { createElement } from "react"

import * as Icons from "lucide-react"

import { cn } from "@/lib/utils"

import { type IconType } from "@/types"

import { AppTooltip } from "@/components/app-tooltip"
import { Button, ButtonProps } from "@/components/ui/button"

interface IconButtonProps extends ButtonProps {
  icon?: IconType
  tooltipContent: string
}

export const IconButton = ({
  icon,
  tooltipContent,
  ...props
}: IconButtonProps) => {
  const IconComponent = Icons[icon?.name || "Egg"] as Icons.LucideIcon
  const { className } = props

  return (
    <AppTooltip content={tooltipContent} isCapitalize>
      <Button
        variant="ghost"
        size="icon"
        {...props}
        className={cn(className, "w-8 h-8")}
      >
        {createElement(IconComponent, {
          ...icon?.props
        })}
      </Button>
    </AppTooltip>
  )
}
