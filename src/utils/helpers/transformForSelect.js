export const transformForSelect = (data, field1, field2) => {
  if (data && data.length) {
    if (typeof data === 'object' && !Array.isArray(data)) {
      return Object.entries(data).map((item) => ({
        value: item[0],
        label: item[1],
      }));
    }
    return data.map((item) => ({
      value: item[field1],
      label: item[field2],
    }));
  }
  return [];
};
