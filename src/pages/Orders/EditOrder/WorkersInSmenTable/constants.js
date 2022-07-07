import { TextInput } from '../../../../components/Form/TextInput/TextInput';
import { CheckboxLabel } from '../../../../components/Form/CheckboxLabel/CheckboxLabel';
import AgActionButtons from '../../../../components/AgActionButtons/AgActionButtons';
import React from 'react';

export const inSmenColumns = ({ control, removeAction, saveAction }) => {
  return [
    { field: 'id', hide: true, headerName: 'ID' },
    { field: 'fullName', headerName: 'ФИО' },
    { field: 'comment', headerName: 'Комментарий' },
    { field: 'number_card', headerName: 'Номер карты' },
    { field: 'bank_name', headerName: 'Банк' },
    {
      field: 'working_hours',
      headerName: 'Смена часов',
      cellRenderer: ({ data }) => (
        <TextInput type="number" size="sm" control={control} name={`${data.id}_working_hours`} />
      ),
    },
    {
      field: 'price_first_stage',
      headerName: 'ЗП 1 этап',
      cellRenderer: ({ data }) => (
        <TextInput
          type="number"
          size="sm"
          control={control}
          name={`${data.id}_price_first_stage`}
        />
      ),
    },
    {
      field: 'is_paid_first_stage',
      headerName: '₽',
      cellRenderer: ({ data }) => (
        <CheckboxLabel control={control} name={`${data.id}_is_paid_first_stage`} />
      ),
    },
    {
      field: 'price_second_stage',
      headerName: 'ЗП 2 этап',
      cellRenderer: ({ data }) => (
        <TextInput
          type="number"
          size="sm"
          control={control}
          name={`${data.id}_price_second_stage`}
        />
      ),
    },
    {
      field: 'is_paid_second_stage',
      headerName: '₽',
      cellRenderer: ({ data }) => (
        <CheckboxLabel control={control} name={`${data.id}_is_paid_second_stage`} />
      ),
    },
    {
      field: 'w_price',
      headerName: 'Сумма з/п работника',
      cellRenderer: ({ data }) => (
        <TextInput type="number" size="sm" control={control} name={`${data.id}_w_price`} disabled />
      ),
    },
    {
      field: 'c_price',
      headerName: 'Цена клиент',
      cellRenderer: ({ data }) => (
        <TextInput type="number" size="sm" control={control} name={`${data.id}_c_price`} disabled />
      ),
    },
    {
      field: 'save',
      headerName: '',
      cellRenderer: ({ data }) => (
        <AgActionButtons
          data={data}
          showSave={true}
          saveAction={() => saveAction(data)}
          withThirdButton={false}
        />
      ),
    },
    {
      field: 'remove',
      headerName: '',
      cellRenderer: ({ data }) => (
        <AgActionButtons
          data={data}
          showRemove={true}
          removeAction={() => removeAction(data)}
          withThirdButton={false}
        />
      ),
    },
  ];
};

export const cellDefaultStyles = { fontSize: '12px', fontWeight: '600' };
