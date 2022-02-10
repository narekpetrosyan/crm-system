import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../../../hooks/useStore';

export const EditUser = () => {
  const { id } = useParams();
  const { usersStore } = useStore();

  useEffect(() => {
    usersStore.getUserById(id);
  }, []);

  return <div>EditUser</div>;
};
