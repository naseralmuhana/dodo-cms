import { Trash2 } from "lucide-react"

import { Heading } from "@/components/heading"
import { ResponsiveDialog } from "@/components/responsive-dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface FormHeaderProps {
  title: string
  description?: string
  isEditing?: boolean
  onDelete?: () => void
  actionButtonLabel?: string // To customize the button label (default to 'Delete')
  actionButtonIcon?: React.ReactNode // To customize the button icon (default to Trash2)
}

export const FormHeader = ({
  title,
  description,
  isEditing = false,
  onDelete
}: FormHeaderProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {isEditing && (
          <ResponsiveDialog
            onConfirm={onDelete}
            trigger={
              <Button variant="destructive" className="sm:w-auto w-10">
                <Trash2 />
                <span className="sm:flex hidden">Delete</span>
              </Button>
            }
          />
        )}
      </div>
      <Separator />
    </>
  )
}
