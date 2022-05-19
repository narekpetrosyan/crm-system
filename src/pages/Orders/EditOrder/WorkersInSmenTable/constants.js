import { TextInput } from '../../../../components/Form/TextInput/TextInput';

export const inSmenColumns = (control) => {
  return [
    { field: 'id', hide: true, headerName: 'ID' },
    { field: 'fullName', headerName: 'ФИО' },
    { field: 'comment', headerName: 'Комментарий' },
    { field: 'number_card', headerName: 'Номер карты' },
    { field: 'bank_name', headerName: 'Банк' },
    {
      field: 'workers_cnt',
      headerName: 'Смена часов',
      cellRenderer: ({ data }) => (
        <TextInput type="number" size="sm" control={control} name={`${data.id}_workers_cnt`} />
      ),
    },
    {
      field: 'w_price_step_one',
      headerName: 'ЗП 1 этап',
      cellRenderer: ({ data }) => (
        <TextInput type="number" size="sm" control={control} name={`${data.id}_w_price_step_one`} />
      ),
    },
    {
      field: 'w_price_step_two',
      headerName: 'ЗП 2 этап',
      cellRenderer: ({ data }) => (
        <TextInput type="number" size="sm" control={control} name={`${data.id}_w_price_step_two`} />
      ),
    },
    {
      field: 'w_price',
      headerName: 'Сумма з/п работника',
      cellRenderer: ({ data }) => (
        <TextInput type="number" size="sm" control={control} name={`${data.id}_w_price`} />
      ),
    },
    {
      field: 'price',
      headerName: 'Цена клиент',
      cellRenderer: ({ data }) => (
        <TextInput type="number" size="sm" control={control} name={`${data.id}_price`} />
      ),
    },
  ];
};

export const cellDefaultStyles = { fontSize: '12px', fontWeight: '600' };
