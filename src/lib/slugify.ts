/**
 * Converts a string to a slug, normalizing it for URLs.
 * @example "My Fancy Title" -> "my-fancy-title"
 * @example "My Fancy Title: Part 2" -> "my-fancy-title-part-2"
 */
export function slugify(str: string): string {
  return str
    .toLowerCase() // Convert to lowercase
    .normalize("NFD") // Normalize accents and diacritics
    .replace(/[\u0300-\u036f]/g, "") // Remove accents/diacritics
    .trim() // Remove leading and trailing spaces
    .replace(/[^\w\s-]/g, "") // Remove non-word, non-whitespace, non-hyphen characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with a single one
}
