import moment from 'moment';

export const convertTableData = (data) => {
  return data.map((item) => ({
    ...item,
    deleted_at: item.deleted_at ? moment(item.deleted_at).format('DD-MM-YYYY HH:MM') : '',
  }));
};
