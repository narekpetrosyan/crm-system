export const genderSelectData = [
  { value: 0, label: 'Мужской' },
  { value: 1, label: 'Женский' },
];

export const statusSelectData = [
  { value: 'WORKING', label: 'В смене' },
  { value: 'READY', label: 'Работающий' },
  { value: 'BLOCKED', label: 'Заблокирован' },
  { value: 'BLACK_LIST', label: 'В чёрном списке' },
  { value: 'RESERVED', label: 'В резерве' },
  { value: 'UNAVAILABLE', label: 'Недоступен' },
  { value: 'REJECTED', label: 'Отказ' },
];

export const contrAgentsStatusesSelectData = [
  { value: 'ACTIVE', label: 'Действующий' },
  { value: 'BLACK_LIST', label: 'В чёрном списке' },
  { value: 'IN_PROGRESS', label: 'В разработке' },
];

export const workTypes = [
  {
    value: 'PER_HOUR',
    label: 'Час',
  },
  {
    value: 'PER_SHIFT',
    label: 'Смена',
  },
];

export const yesNo = [
  {
    value: 0,
    label: 'Нет',
  },
  {
    value: 1,
    label: 'Да',
  },
];
