import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';
import Loader from '@components/Loader/Loader';
import { Button } from '@components/Button/Button';
import PageHeading from '@components/PageHeading/PageHeading';
import { TextInput } from '@components/Form/TextInput/TextInput';
import { SelectInput } from '@components/Form/SelectInput/SelectInput';
import TextAreaInput from '@components/Form/TextAreaInput/TextAreaInput';
import { AsyncSelectInput } from '@components/Form/SelectInput/AsyncSelectInput';
import ContactNestedFields from './NestedFields/ContactNestedFields';
import ObjectsNestedFields from './NestedFields/ObjectsNestedFields';
import { transformForSelect } from '@utils/helpers/transformForSelect';
import { contrAgentsStatusesSelectData } from '@utils/helpers/staticSeletcData';
import { createContrAgentValidationSchema } from '@utils/validation/contrAgentsValidationSchema';
import { useStore } from '@hooks/useStore';
import { useSelectOptions } from '@hooks/useSelectOptions';

import styles from './EditContrAgent.module.scss';

const EditContrAgent = observer(() => {
  const { id } = useParams();
  const { citiesStore, contrAgentsStore } = useStore();
  const { searchByText, isLoading } = useSelectOptions();
  const form = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(createContrAgentValidationSchema),
    defaultValues: {
      contactListContragent:
        contrAgentsStore.contrAgent?.contacts && contrAgentsStore.contrAgent?.contacts,
    },
  });
  const { control } = form;

  useEffect(() => {
    const fetchContrAgentData = async () => {
      if (id) await contrAgentsStore.getContrAgentById(id);
    };
    fetchContrAgentData();
  }, []);

  useEffect(() => {
    form.reset({
      ...contrAgentsStore.contrAgent,
      contactListContragent: contrAgentsStore.contrAgent?.contacts,
      objList: contrAgentsStore.contrAgent?.objects.map((it) => ({
        ...it,
        contacts: it.contacts,
      })),
    });
  }, [contrAgentsStore.contrAgent]);

  const submitForm = (data) => {
    contrAgentsStore.saveContrAgent(id, {
      ...data,
      city_id: data.city_id.value,
      status: data.status.value,
    });
  };

  if (contrAgentsStore.isLoading && citiesStore.isLoading) return <Loader />;

  return (
    <InnerLayout>
      <PageHeading title="Редактировать контрагента" />
      <div className={styles.ContrAgentsInnerBody}>
        <FormProvider {...form}>
          <div className={styles.EditContrAgentForm}>
            <div className={styles.EditContrAgentFormBlock}>
              <TextInput withTopLabel label="Наименование" name="name" />
              <TextInput withTopLabel label="Юридический адрес" name="address_legal" />
              <TextInput withTopLabel label="Фактический адрес" name="address_actual" />
            </div>
            <div className={styles.EditContrAgentFormBlock}>
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
            <div className={styles.EditContrAgentFormBlock}>
              <TextInput type="number" withTopLabel label="ИНН" name="INN" />
              <TextInput type="number" withTopLabel label="КПП" name="KPP" />
              <TextInput type="number" withTopLabel label="БИК" name="BIK" />
              <TextInput type="number" withTopLabel label="ОГРН" name="ORGNIP" />
            </div>
            <div className={styles.EditContrAgentFormBlock}>
              <TextInput withTopLabel label="Наименование банка" name="bank_name" />
              <TextInput type="number" withTopLabel label="Кор. счёт" name="short_account_number" />
              <TextInput type="number" withTopLabel label="Расчётный счёт" name="payment_account" />
              <TextInput withTopLabel label="Адрес сайта" name="url" />
            </div>
            <div className={styles.EditContrAgentFormBlock}>
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

            <ContactNestedFields control={control} items={contrAgentsStore.contrAgent?.contacts} />

            <ObjectsNestedFields control={control} />

            <div className={styles.EditContrAgentFormBlock}>
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

export default EditContrAgent;
