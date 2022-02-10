import { useContext } from 'react';
import { StoresContext } from '../store/rootStore';

export const useStore = () => {
  return useContext(StoresContext);
};
