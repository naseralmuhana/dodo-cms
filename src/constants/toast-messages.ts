export const TOAST_MESSAGES = {
  DELETE: {
    success: (itemName: string) => `${itemName} has been successfully deleted.`,
    error: (itemName: string) => `Failed to delete ${itemName}.`
  },
  CREATE: {
    success: (itemName: string) => `${itemName} has been successfully created.`,
    error: (itemName: string) => `Failed to create ${itemName}.`
  },
  UPDATE: {
    success: (itemName: string) => `${itemName} has been successfully updated.`,
    error: (itemName: string) => `Failed to update ${itemName}.`
  }
}
