// Define the props that the Heading component accepts
interface HeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string // The main title text
  description?: string // Supporting description text
}

// Define the Heading component using React functional component syntax
export function Heading({ title, description, className }: HeadingProps) {
  return (
    // Use the provided className if available, for additional styling
    <div className={className}>
      {/* Render the main title */}
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      {/* Conditionally render the description if provided */}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
