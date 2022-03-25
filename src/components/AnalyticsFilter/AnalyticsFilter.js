import React, { memo, useCallback } from 'react';
import { FormProvider } from 'react-hook-form';
import { Button } from '../Button/Button';
import DateInput from '../Form/DateInput/DateInput';
import { SelectInput } from '../Form/SelectInput/SelectInput';
import { CheckboxLabel } from '../Form/CheckboxLabel/CheckboxLabel';
import { transformForSelect } from '@utils/helpers/transformForSelect';

import styles from './AnalyticsFilter.module.scss';

const AnalyticsFilter = ({ form, selectOptions, submitAction, selectLabel }) => {
  const submitForm = useCallback((data) => {
    submitAction({
      ...data,
      contragent_id: data.contragent_id.value,
    });
  }, []);

  return (
    <div className={styles.AnalyticsFilterBlockWrapper}>
      <FormProvider {...form}>
        <form>
          <div className={styles.FormWrapper}>
            <div className={styles.FormInputs}>
              <SelectInput
                name="contragent_id"
                size="100%"
                withTopLabel
                label={selectLabel}
                options={transformForSelect(selectOptions, 'id', 'name')}
                className={styles.SearchSelect}
              />

              <DateInput name="dt_start" label="От" className={styles.DateInput} />
              <DateInput name="dt_end" label="До" className={styles.DateInput} />
            </div>

            <div className={styles.FormButtons}>
              <CheckboxLabel label="Работники" name="workers" />
              <CheckboxLabel label="Заказы" name="orders" />
              <CheckboxLabel label="Проведенные заказы" name="finished" />
              <Button clickHandler={form.handleSubmit(submitForm)} size={90} color="submit">
                Искать
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default memo(AnalyticsFilter);
