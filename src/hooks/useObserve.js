import React, { useEffect } from 'react';
import { autorun } from 'mobx';
import { useStore } from './useStore';

export const useObserve = () => {
  const { usersStore } = useStore();

  useEffect(() => {
    const disposer = autorun(
      () => {
        usersStore.fetchPermissionsAndCities();
      },
      {
        onError: (error) => console.log(error),
      },
    );

    return () => disposer();
  }, []);
};
