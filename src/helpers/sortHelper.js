export const sortAscending = (data) => {
  return data
    .slice()
    .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
};

export const sortDescending = (data) => {
  return data
    .slice()
    .sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1));
};
