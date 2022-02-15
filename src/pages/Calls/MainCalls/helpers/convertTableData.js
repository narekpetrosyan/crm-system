export const convertTableData = (data) => {
  return data.map((item) => ({
    ...item,
    contragent: item.contragent?.name,
    contact: item.contact?.name,
    is_finished: item.is_finished === 1 ? '+' : '-',
  }));
};
