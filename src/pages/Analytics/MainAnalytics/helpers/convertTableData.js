export const convertTableData = (data) => {
  return data?.map((item) => ({
    id: item.id,
    is_ended: item.is_ended,
    order_id: item.id,
    contragent: item.contragent,
    object_name: item.object,
  }));
};
