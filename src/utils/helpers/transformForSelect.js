export const transformForSelect = (data, field1, field2) => {
  if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
    return Object.entries(data).map((item) => ({
      value: item[0],
      label: item[1],
    }));
  }
  return data.map((item) => ({
    value: item[field1],
    label: item[field2],
  }));
};
