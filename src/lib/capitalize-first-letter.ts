/**
 * Capitalizes the first letter of a string.
 *
 * @example
 * capitalizeFirstLetter("hello") // "Hello"
 * capitalizeFirstLetter("") // ""
 */
export function capitalizeFirstLetter(str: string): string {
  return str ? str[0].toUpperCase() + str.slice(1).toLowerCase() : str
}
