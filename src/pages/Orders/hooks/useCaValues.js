import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import OrdersService from '../../../http/orders-service/orders-service';
import { transformForSelect } from '../../../utils/helpers/transformForSelect';
import { $authHost } from '../../../http';
import { workTypes } from '../../../utils/helpers/staticSeletcData';

export const useCaValues = (control, setValue) => {
  const [contrAgents, setContrAgents] = useState([]);
  const [contrAgentsLoading, setContrAgentsLoading] = useState([]);

  useEffect(() => {
    setValue('work_type', workTypes[0]);
    const getContrAgents = async () => {
      try {
        setContrAgentsLoading(true);
        const { data } = await $authHost.get('/search-contragent');
        setContrAgents(transformForSelect(data.results, 'id', 'name'));
      } catch (e) {
        console.log(e);
      } finally {
        setContrAgentsLoading(false);
      }
    };
    getContrAgents();
  }, []);

  const [caObjects, setCaObjects] = useState([]);
  const [caObjectsLoading, setCaObjectsLoading] = useState(false);
  const watchCAId = useWatch({ name: 'contragent_id', control })?.value;

  useEffect(() => {
    const loadCaObjects = async () => {
      try {
        setCaObjectsLoading(true);
        const { data } = await OrdersService.getCaObjects(watchCAId);
        setCaObjects(transformForSelect(data.results, 'id', 'name'));
      } catch (e) {
        console.log(e);
      } finally {
        setCaObjectsLoading(false);
      }
    };
    if (watchCAId) {
      loadCaObjects();
    }
  }, [watchCAId]);

  const [caOContactList, setCaOContactList] = useState([]);
  const [notFiltered, setNotFiltered] = useState([]);
  const [wPrice, setWPrice] = useState();
  const [price, setPrice] = useState();
  const [comment, setComment] = useState();
  const [caOContactListLoading, setCaOContactListLoading] = useState(false);
  const watchCAOId = useWatch({ name: 'object_id', control })?.value;

  useEffect(() => {
    const loadCaOContactList = async () => {
      try {
        setCaOContactListLoading(true);
        const { data } = await OrdersService.getCaOContactList(watchCAOId);
        setNotFiltered(data.results);
        setWPrice(data.ca.w_price);
        setPrice(data.ca.price);
        setComment(data.ca.comment);
        setCaOContactList(transformForSelect(data.results, 'id', 'name'));
      } catch (e) {
        console.log(e);
      } finally {
        setCaOContactListLoading(false);
      }
    };
    if (watchCAOId) {
      loadCaOContactList();
    }
  }, [watchCAOId]);

  const watchCAOListId = useWatch({ name: 'contact_id', control })?.value;

  useEffect(() => {
    if (watchCAOListId) {
      setValue('phone', notFiltered.find((el) => Number(el.id) === watchCAOListId)?.phone);
      setValue('w_price', wPrice);
      setValue('price', price);
      setValue('comment', comment);
    }
  }, [watchCAOListId]);

  return {
    contrAgents,
    contrAgentsLoading,
    caObjects,
    caObjectsLoading,
    caOContactList,
    caOContactListLoading,
  };
};
