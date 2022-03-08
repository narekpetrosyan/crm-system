import React, { useEffect, memo } from 'react';
import { observer } from 'mobx-react-lite';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';
import { Button } from '@components/Button/Button';
import PageHeading from '@components/PageHeading/PageHeading';
import { TextInput } from '@components/Form/TextInput/TextInput';
import { SelectInput } from '@components/Form/SelectInput/SelectInput';
import TextAreaInput from '@components/Form/TextAreaInput/TextAreaInput';
import { AsyncSelectInput } from '@components/Form/SelectInput/AsyncSelectInput';
import { transformForSelect } from '@utils/helpers/transformForSelect';
import { contrAgentsStatusesSelectData } from '@utils/helpers/staticSeletcData';
import { createContrAgentValidationSchema } from '@utils/validation/contrAgentsValidationSchema';
import { useStore } from '@hooks/useStore';
import { useSelectOptions } from '@hooks/useSelectOptions';
import ContactNestedFields from './NestedFields/ContactNestedFields';
import ObjectsNestedFields from './NestedFields/ObjectsNestedFields';

import styles from './CreateContrAgent.module.scss';

const CreateContrAgent = observer(() => {
  const { citiesStore, contrAgentsStore } = useStore();
  const { searchByText, isLoading } = useSelectOptions();

  const form = useForm({
    defaultValues: {
      name: '',
      address_legal: '',
      address_actual: '',
      price: '',
      w_price: '',
      w_price_step_one: '',
      w_price_step_two: '',
      INN: '',
      KPP: '',
      BIK: '',
      ORGNIP: '',
      bank_name: '',
      short_account_number: '',
      payment_account: '',
      url: '',
      comment: '',
      city_id: '',
      responsible_id: '',
      status: '',
      contactListContragent: [
        {
          id: null,
          name: '',
          phone: '',
          email: '',
          position: '',
          phone_dop: '',
        },
      ],
      objList: [
        {
          id: null,
          name: '',
          address: '',
          contacts: [
            {
              id: null,
              name: '',
              phone: '',
              email: '',
              position: '',
              phone_dop: '',
            },
          ],
        },
      ],
    },
    resolver: yupResolver(createContrAgentValidationSchema),
  });

  const { control } = form;

  useEffect(() => {
    citiesStore.fetchCities();
  }, []);

  const submitForm = (data) => {
    contrAgentsStore.createContrAgent(data);
  };

  return (
    <InnerLayout>
      <PageHeading title="Добавить контрагента" />
      <div className={styles.ContrAgentsInnerBody}>
        <FormProvider {...form}>
          <div className={styles.CreateContrAgentForm}>
            <div className={styles.CreateContrAgentFormBlock}>
              <TextInput withTopLabel label="Наименование" name="name" />
              <TextInput withTopLabel label="Юридический адрес" name="address_legal" />
              <TextInput withTopLabel label="Фактический адрес" name="address_actual" />
            </div>
            <div className={styles.CreateContrAgentFormBlock}>
              <TextInput
                type="number"
                withTopLabel
                label="Ставка для заказчика руб./ч"
                name="price"
              />
              <TextInput
                type="number"
                withTopLabel
                label="Ставка работника, руб./ч"
                name="w_price"
              />
              <TextInput
                type="number"
                withTopLabel
                label="Ставка работника (Первый этап) руб./ч"
                name="w_price_step_one"
              />
              <TextInput
                type="number"
                withTopLabel
                label="Ставка работника (Второй этап) руб./ч"
                name="w_price_step_two"
              />
            </div>
            <div className={styles.CreateContrAgentFormBlock}>
              <TextInput type="number" withTopLabel label="ИНН" name="INN" />
              <TextInput type="number" withTopLabel label="КПП" name="KPP" />
              <TextInput type="number" withTopLabel label="БИК" name="BIK" />
              <TextInput type="number" withTopLabel label="ОГРН" name="ORGNIP" />
            </div>
            <div className={styles.CreateContrAgentFormBlock}>
              <TextInput withTopLabel label="Наименование банка" name="bank_name" />
              <TextInput type="number" withTopLabel label="Кор. счёт" name="short_account_number" />
              <TextInput type="number" withTopLabel label="Расчётный счёт" name="payment_account" />
              <TextInput withTopLabel label="Адрес сайта" name="url" />
            </div>
            <div className={styles.CreateContrAgentFormBlock}>
              <TextAreaInput
                withTopLabel
                label="Комментарий"
                name="comment"
                resizable={false}
                size={[10, 5]}
              />
              <SelectInput
                options={transformForSelect(citiesStore.cities, 'id', 'name')}
                withTopLabel
                label="Город"
                name="city_id"
              />
              <AsyncSelectInput
                loading={isLoading}
                asyncSearch={searchByText}
                withTopLabel
                label="Ответственный"
                name="responsible_id"
              />
              <SelectInput
                withTopLabel
                options={contrAgentsStatusesSelectData}
                label="Статус контрагента"
                name="status"
              />
            </div>

            <ContactNestedFields control={control} />

            <ObjectsNestedFields control={control} />

            <div className={styles.CreateContrAgentFormBlock}>
              <Button color="submit" clickHandler={form.handleSubmit(submitForm)} size={150}>
                Сохранить
              </Button>
            </div>
          </div>
        </FormProvider>
      </div>
    </InnerLayout>
  );
});

export default memo(CreateContrAgent);
