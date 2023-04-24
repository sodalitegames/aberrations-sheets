export const replaceItemById = (arr: any[], id: string, newItem: any) => {
  const index = arr.findIndex(el => el._id === id);
  return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
};

export const removeItemById = (arr: any[], id: string) => {
  return arr.filter(el => el._id !== id);
};
