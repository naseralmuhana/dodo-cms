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
    return <div>{serverError}</div>
  }

  if (validationErrors) {
    return (
      <div>
        {Object.keys(validationErrors).map((key) => (
          <p
            key={key}
          >{`${key}: ${validationErrors && validationErrors[key as keyof typeof validationErrors]}`}</p>
        ))}
      </div>
    )
  }

  return null
}
