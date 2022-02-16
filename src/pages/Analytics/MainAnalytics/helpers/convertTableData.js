export const convertTableData = (data) => {
  return data.map((item) => ({
    id: item.id,
    order_id: item.id,
    contragent: item.contragent.name,
    object_name: item.object.name,
  }));
};
