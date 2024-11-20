import * as React from "react"

/**
 * Checks if the current viewport width is smaller than the given breakpoint.
 * @param breakpoint the maximum width in pixels (default: 768)
 * @returns true if the viewport width is smaller than the breakpoint, false otherwise
 */
export function useIsMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)

    const onChange = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < breakpoint)

    return () => mql.removeEventListener("change", onChange)
  }, [breakpoint])

  return !!isMobile
}
