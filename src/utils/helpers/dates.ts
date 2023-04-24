export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', { timeZone: 'UTC', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};

export const isoStringDate = (date: string) => {
  return new Date(date).toISOString().split('T')[0];
};
