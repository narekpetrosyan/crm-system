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
import ContactNestedFields from './NestedFields/ContactNestedFields';
import ObjectsNestedFields from './NestedFields/ObjectsNestedFields';
import { transformForSelect, transformForSelectObject } from '@utils/helpers/transformForSelect';
import { contrAgentsStatusesSelectData } from '@utils/helpers/staticSeletcData';
import { createContrAgentValidationSchema } from '@utils/validation/contrAgentsValidationSchema';
import { useStore } from '@hooks/useStore';
import { useSelectOptions } from '@hooks/useSelectOptions';

import styles from './EditContrAgent.module.scss';

const EditContrAgent = observer(() => {
  const { id } = useParams();
  const { citiesStore, contrAgentsStore } = useStore();
  const { filteredUsers, isLoading } = useSelectOptions();

  const form = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(createContrAgentValidationSchema),
    defaultValues: {
      contactListContragent:
        contrAgentsStore.contrAgent?.contacts && contrAgentsStore.contrAgent?.contacts,
    },
  });
  const { control, setValue } = form;

  useEffect(() => {
    const fetchContrAgentData = async () => {
      if (id) await contrAgentsStore.getContrAgentById(id);
    };
    fetchContrAgentData().then(() => {
      if (contrAgentsStore.contrAgent?.responsible) {
        setValue(
          'responsible_id',
          transformForSelectObject(contrAgentsStore.contrAgent?.responsible, 'id', 'name'),
        );
      }
    });
  }, []);

  useEffect(() => {
    form.reset({
      ...contrAgentsStore.contrAgent,
      contactListContragent: contrAgentsStore.contrAgent?.contacts,
      city_id: Number(contrAgentsStore.contrAgent?.city_id),
      objList: contrAgentsStore.contrAgent?.objects.map((it) => ({
        ...it,
        contacts: it.contacts,
      })),
    });
  }, [contrAgentsStore.contrAgent]);

  const submitForm = (data) => {
    contrAgentsStore.saveContrAgent(id, {
      ...data,
      city_id: data.city_id?.value || null,
      status: data.status?.value,
      responsible_id: data.responsible_id?.value || null,
    });
  };

  if (contrAgentsStore.isLoading && citiesStore.isLoading) return <Loader />;

  return (
    <InnerLayout>
      <PageHeading title="?????????????????????????? ??????????????????????" />
      <div className={styles.ContrAgentsInnerBody}>
        <FormProvider {...form}>
          <div className={styles.EditContrAgentForm}>
            <div className={styles.EditContrAgentFormBlock}>
              <TextInput control={control} withTopLabel label="????????????????????????" name="name" />
              <TextInput
                control={control}
                withTopLabel
                label="?????????????????????? ??????????"
                name="address_legal"
              />
              <TextInput
                control={control}
                withTopLabel
                label="?????????????????????? ??????????"
                name="address_actual"
              />
            </div>
            <div className={styles.EditContrAgentFormBlock}>
              <TextInput
                control={control}
                type="number"
                withTopLabel
                label="???????????? ?????? ?????????????????? ??????./??"
                name="price"
              />
              <TextInput
                control={control}
                type="number"
                withTopLabel
                label="???????????? ??????????????????, ??????./??"
                name="w_price"
              />
              <TextInput
                control={control}
                type="number"
                withTopLabel
                label="???????????? ?????????????????? (1 ????????) ??????./??"
                name="w_price_step_one"
              />
              <TextInput
                control={control}
                type="number"
                withTopLabel
                label="???????????? ?????????????????? (2 ????????) ??????./??"
                name="w_price_step_two"
              />
            </div>
            <div className={styles.EditContrAgentFormBlock}>
              <TextInput control={control} type="number" withTopLabel label="??????" name="INN" />
              <TextInput control={control} type="number" withTopLabel label="??????" name="KPP" />
              <TextInput control={control} type="number" withTopLabel label="??????" name="BIK" />
              <TextInput control={control} type="number" withTopLabel label="????????" name="ORGNIP" />
            </div>
            <div className={styles.EditContrAgentFormBlock}>
              <TextInput
                control={control}
                withTopLabel
                label="???????????????????????? ??????????"
                name="bank_name"
              />
              <TextInput
                control={control}
                type="number"
                withTopLabel
                label="??????. ????????"
                name="short_account_number"
              />
              <TextInput
                control={control}
                type="number"
                withTopLabel
                label="?????????????????? ????????"
                name="payment_account"
              />
              <TextInput control={control} withTopLabel label="?????????? ??????????" name="url" />
            </div>
            <div className={styles.EditContrAgentFormBlock}>
              <TextAreaInput
                withTopLabel
                label="??????????????????????"
                name="comment"
                resizable={false}
                size={[10, 5]}
              />
              <SelectInput
                options={transformForSelect(citiesStore.cities, 'id', 'name')}
                withTopLabel
                label="??????????"
                name="city_id"
              />
              {!isLoading && (
                <SelectInput
                  withTopLabel
                  label="??????????????????????????"
                  name="responsible_id"
                  options={filteredUsers}
                />
              )}
              <SelectInput
                withTopLabel
                options={contrAgentsStatusesSelectData}
                label="???????????? ??????????????????????"
                name="status"
              />
            </div>

            <ContactNestedFields control={control} items={contrAgentsStore.contrAgent?.contacts} />

            <ObjectsNestedFields control={control} />

            <div className={styles.EditContrAgentFormBlock}>
              <Button
                color="submit"
                clickHandler={form.handleSubmit(submitForm)}
                size={150}
                disabled={contrAgentsStore.isLoading}
                loading={contrAgentsStore.isLoading}
              >
                ??????????????????
              </Button>
            </div>
          </div>
        </FormProvider>
      </div>
    </InnerLayout>
  );
});

export default EditContrAgent;
