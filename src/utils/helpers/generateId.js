export const generateId = (prefix = '') =>
  prefix + Math.floor(Math.random() * 0xffffffff).toString(16);
