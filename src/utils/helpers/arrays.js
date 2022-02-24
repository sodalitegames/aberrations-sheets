export const replaceItemById = (arr, id, newItem) => {
  const index = arr.findIndex(el => el._id === id);
  return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
};

export const removeItemById = (arr, id) => {
  return arr.filter(el => el._id !== id);
};
