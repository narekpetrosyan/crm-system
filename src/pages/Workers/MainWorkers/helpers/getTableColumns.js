export const getTableColumns = [
  { field: 'id', hide: true, headerName: 'ID' },
  { field: 'fullName', headerName: 'ФИО' },
  { field: 'phone', headerName: 'Тел. 1' },
  { field: 'phone_dop', headerName: 'Тел. 2' },
  { field: 'workers_cnt', headerName: 'Отработал смен', maxWidth: 80 },
  { field: 'status', headerName: 'Статус' },
  { field: 'city', headerName: 'Город' },
  { field: 'comment', headerName: 'Комментарий' },
  { field: 'deleted_at', headerName: 'На удаление' },
];
