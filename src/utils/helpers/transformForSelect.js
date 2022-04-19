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

export const transformForSelectObject = (data, f1, f2) => {
  return {
    value: !Number.isNaN(Number(data[f1])) ? Number(data[f1]) : data[f1],
    label: data[f2],
  };
};
