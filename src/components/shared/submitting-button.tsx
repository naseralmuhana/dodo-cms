"use client"

import { Loader2Icon } from "lucide-react"

import { Button, type ButtonProps } from "@/components/ui/button"

interface LoadingButton extends ButtonProps {
  label: React.ReactNode
  isLoading?: boolean
}

export const SubmittingButton = ({
  label,
  isLoading,
  ...props
}: LoadingButton) => {
  return (
    <Button type="submit" variant="outline" disabled={isLoading} {...props}>
      {isLoading ? <Loader2Icon className="h-5 w-5 animate-spin" /> : label}
    </Button>
  )
}
