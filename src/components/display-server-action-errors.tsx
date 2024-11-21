import { Card, CardContent } from "@/components/ui/card"

interface DisplayServerActionErrorProps {
  result: {
    data?: undefined
    serverError?: string | undefined // errors from server
    validationErrors?: Record<string, string[] | undefined> | undefined // input error
    bindArgsValidationErrors?: readonly [] | undefined
  }
}

export function DisplayServerActionError({
  result
}: DisplayServerActionErrorProps) {
  const { serverError, validationErrors } = result

  if (serverError) {
    return (
      <Card className="max-w-3xl border-destructive text-destructive">
        <CardContent className="pt-6">
          <li>{serverError}</li>
        </CardContent>
      </Card>
    )
  }

  if (validationErrors) {
    return (
      <Card className="max-w-3xl border-destructive text-destructive">
        <CardContent className="pt-6">
          {Object.keys(validationErrors).map((key) => (
            <li
              key={key}
            >{`${key}: ${validationErrors && validationErrors[key as keyof typeof validationErrors]}`}</li>
          ))}
        </CardContent>
      </Card>
    )
  }

  return null
}
