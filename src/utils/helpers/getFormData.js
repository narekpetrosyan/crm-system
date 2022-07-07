export const getFormData = (data) => {
  const newObj = new Map();
  const keys = new Set([]);
  const pp = {};
  Object.entries(data).forEach(([key, value]) => {
    const splitter = key.split('_');
    keys.add(splitter[0]);
    newObj.set(splitter, value);
  });

  newObj.forEach((value, key) => {
    if (keys.has(key[0])) {
      pp[key[0]] = {
        ...pp[key[0]],
        [key.slice(1).join('_')]: value,
      };
    }
  });

  return pp;
};
