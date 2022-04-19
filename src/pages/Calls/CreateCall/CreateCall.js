import React, { memo, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';
import { Button } from '@components/Button/Button';
import DateInput from '@components/Form/DateInput/DateInput';
import PageHeading from '@components/PageHeading/PageHeading';
import { TextInput } from '@components/Form/TextInput/TextInput';
import { SelectInput } from '@components/Form/SelectInput/SelectInput';
import TextAreaInput from '@components/Form/TextAreaInput/TextAreaInput';
import { CheckboxLabel } from '@components/Form/CheckboxLabel/CheckboxLabel';
import { transformForSelect } from '@utils/helpers/transformForSelect';
import { createCallValidationSchema } from '@utils/validation/callsValidationSchema';
import { useStore } from '@hooks/useStore';

import styles from './CreateCall.module.scss';

const CreateCall = observer(() => {
  const { contrAgentsStore, callsStore } = useStore();

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(createCallValidationSchema),
    defaultValues: {
      time: '',
      next_call_time: '',
      contragent_id: '',
      contact_id: '',
      withNextCallTime: false,
      phone: '',
      email: '',
      is_finished: false,
      changedCalls: [],
    },
  });

  const { control } = form;

  const contactId = form.watch('contact_id')?.value;
  const contrAgentId = form.watch('contragent_id')?.value;
  const withNextCallTime = form.watch('withNextCallTime');

  useEffect(() => {
    contrAgentsStore.fetchContrAgents();
  }, []);

  useEffect(() => {
    if (contrAgentId && contrAgentId !== 'undefined') {
      contrAgentsStore.getContrAgentContacts(contrAgentId).then(() => {
        form.setValue('changedCalls', contrAgentsStore?.contactResults);
      });
    }
  }, [contrAgentId]);

  form.setValue('phone', contrAgentsStore.getContactEmailAndPhone(contactId)?.phone || '');
  form.setValue('email', contrAgentsStore.getContactEmailAndPhone(contactId)?.email || '');

  const setNextCallTimeShown = useCallback(() => form.setValue('withNextCallTime', true), []);

  const submitForm = (data) => {
    delete data.withNextCallTime;
    callsStore.createCall({
      ...data,
      contact_id: data.contact_id.value,
      contragent_id: data.contragent_id.value,
    });
  };

  return (
    <InnerLayout>
      <PageHeading title="Добавить звонок" />

      <div className={styles.CallsInnerBody}>
        <FormProvider {...form}>
          <form>
            <div className={styles.FormInputs}>
              <div className={styles.FormInputsTop}>
                <SelectInput
                  name="contragent_id"
                  size={250}
                  withTopLabel
                  label="Контрагент"
                  options={transformForSelect(contrAgentsStore.contrAgents, 'id', 'name')}
                />
                <SelectInput
                  name="contact_id"
                  size={250}
                  withTopLabel
                  label="Контактное лицо"
                  options={transformForSelect(contrAgentsStore.contacts, 'id', 'name')}
                />
                <TextInput
                  control={control}
                  size={300}
                  name="phone"
                  withTopLabel
                  label="Телефон"
                  disabled
                />
                <TextInput
                  control={control}
                  size={300}
                  name="email"
                  withTopLabel
                  label="Email"
                  disabled
                />
              </div>
              <div>
                <CheckboxLabel name="is_finished" label="Выполнен" />
              </div>
            </div>
            <div className={styles.FormDates}>
              <DateInput
                name="time"
                variant="datetime"
                label="Дата и время звонка"
                className={styles.DateInput}
              />
              {!withNextCallTime ? (
                <Button
                  color="warning"
                  size={250}
                  clickHandler={setNextCallTimeShown}
                  type="button"
                  className={styles.DateInput}
                >
                  Ввести дату следущего звонка
                </Button>
              ) : (
                <DateInput
                  name="next_call_time"
                  variant="datetime"
                  label="Дата и время следующего звонка"
                  className={styles.DateInput}
                />
              )}
            </div>
            <div>
              <TextAreaInput name="result" label="Результат" placeholder="Результат" />
            </div>

            <div className={styles.CallsInnerSave}>
              <Button
                color="submit"
                clickHandler={form.handleSubmit(submitForm)}
                size={150}
                disabled={callsStore.isLoading}
                loading={callsStore.isLoading}
              >
                Сохранить
              </Button>
            </div>

            {contrAgentsStore.isContactResultsLoaded && (
              <div className={styles.CallsHistory}>
                <PageHeading title="История звонков" />
                {contrAgentsStore.contactResults.map((item, index) => (
                  <div key={item.id} className={styles.CallsHistoryItem}>
                    <div>
                      <CheckboxLabel
                        name={`changedCalls[${index}].is_finished`}
                        label="Выполнен"
                        value={item.is_finished}
                      />
                    </div>
                    <div className={styles.CallsHistoryItemResult}>
                      <TextAreaInput
                        name={`changedCalls[${index}].result`}
                        label="Результат"
                        placeholder="Результат"
                        value={item.result}
                        resizable={false}
                        disabled
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </form>
        </FormProvider>
      </div>
    </InnerLayout>
  );
});

export default memo(CreateCall);
