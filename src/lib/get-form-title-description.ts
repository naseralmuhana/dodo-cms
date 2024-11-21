/**
 * Generates the title and description for a form based on the action (edit or create)
 * and the provided entity details (name and optional value).
 *
 * This function dynamically constructs the title and description based on whether
 * the form is for editing an existing entity or creating a new one.
 *
 * @param {Object} params - The parameters object.
 * @param {boolean} params.isEditing - Flag indicating whether the form is for editing (true) or creating (false).
 * @param {string} params.entityName - The name of the entity (e.g., "Category").
 * @param {string} [params.entityValue] - The value of the entity (e.g., the specific name of the category), only required when editing.
 *
 * @returns {Object} An object containing the generated `title` and `description` for the form.
 * @returns {string} title - The title of the form (e.g., "Create a Category" or "Edit a Category").
 * @returns {string} description - The description for the form (e.g., "Create a new Category" or "Edit your 'Sample Category'").
 *
 * @example
 * // Example usage when creating a new category
 * const { title, description } = getFormTitleAndDescription({
 *   isEditing: false,
 *   entityName: "Category"
 * })
 * console.log(title) // "Create a Category"
 * console.log(description) // "Create a new Category"
 *
 * @example
 * // Example usage when editing an existing category
 * const { title, description } = getFormTitleAndDescription({
 *   isEditing: true,
 *   entityName: "Category",
 *   entityValue: "Sample Category"
 * })
 * console.log(title) // "Edit a Category"
 * console.log(description) // "Edit your 'Sample Category' Category"
 */
export function getFormTitleAndDescription({
  isEditing,
  entityName,
  entityValue
}: {
  isEditing: boolean
  entityName: string
  entityValue?: string
}) {
  const action = isEditing ? "Edit" : "Create"
  const title = `${action} a ${entityName}`
  const description = isEditing
    ? `Edit your \`${entityValue}\` ${entityName}`
    : `Create a new ${entityName}`

  return { title, description }
}
