import { TextInput } from '../../../../components/Form/TextInput/TextInput';
import { CheckboxLabel } from '../../../../components/Form/CheckboxLabel/CheckboxLabel';

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
      field: 'is_paid',
      headerName: '₽',
      cellRenderer: ({ data }) => <CheckboxLabel control={control} name={`${data.id}_is_paid`} />,
    },
    {
      field: 'w_price_step_two',
      headerName: 'ЗП 2 этап',
      cellRenderer: ({ data }) => (
        <TextInput type="number" size="sm" control={control} name={`${data.id}_w_price_step_two`} />
      ),
    },
    {
      field: 'is_paid',
      headerName: '₽',
      cellRenderer: ({ data }) => <CheckboxLabel control={control} name={`${data.id}_is_paid`} />,
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
