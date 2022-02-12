export const transformForSelect = (data, field1, field2) => {
  return data.map((item) => ({
    value: item[field1],
    label: item[field2],
  }));
};
