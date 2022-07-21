export const convertTableData = (data) => {
  return data?.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    city: item.city,
    is_admin: item.is_admin ? 'Да' : 'Нет',
  }));
};
