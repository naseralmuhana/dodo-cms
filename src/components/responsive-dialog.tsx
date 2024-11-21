"use client"

import { DIALOG_TEXTS } from "@/constants"

import { useIsMobile } from "@/hooks/use-mobile"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogAction,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerAction,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer"

interface ResponsiveDialogProps {
  trigger?: React.ReactNode
  title?: string
  description?: string
  hideTrigger?: boolean
  onConfirm?: () => void
  open?: boolean
  setOpen?: (open: boolean) => void
  children?: React.ReactNode
}

export function ResponsiveDialog({
  trigger,
  title = DIALOG_TEXTS.DELETE_CONFIRMATION.title,
  description = DIALOG_TEXTS.DELETE_CONFIRMATION.description,
  hideTrigger = false,
  onConfirm,
  open,
  setOpen,
  children
}: ResponsiveDialogProps) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        {!hideTrigger && (
          <DrawerTrigger asChild>
            {trigger || <Button variant="outline">Open</Button>}
          </DrawerTrigger>
        )}
        <DrawerContent>
          <DrawerHeader className="text-left gap-y-2">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          {children}
          <DrawerFooter className="pt-2">
            <DrawerAction asChild>
              <Button onClick={onConfirm}>Confirm</Button>
            </DrawerAction>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!hideTrigger && (
        <DialogTrigger asChild>
          {trigger || <Button variant="outline">Open</Button>}
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="gap-y-2">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogAction onClick={onConfirm} asChild>
            <Button>Confirm</Button>
          </DialogAction>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
