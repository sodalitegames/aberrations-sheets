export const formatValidationErrors = (errors: any): string[] => {
  return Object.values(errors).map((error: any) => error.message);
};
