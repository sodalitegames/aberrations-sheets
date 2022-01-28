export const formatValidationErrors = errors => {
  return Object.values(errors).map(error => error.message);
};
