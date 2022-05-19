import React, { useEffect, useState } from 'react';

export const useTableCalculator = ({ watchedData }) => {
  const [wHours, setWHours] = useState(0);
  const [price, setPrice] = useState(0);
  const [wPrice, setWPrice] = useState(0);
  const [wPriceStepOne, setWPriceStepOne] = useState(0);
  const [wPriceStepTwo, setWPriceStepTwo] = useState(0);

  useEffect(() => {
    if (Object.keys(watchedData).length > 0) {
      let totalWHours = 0;
      for (const prop in watchedData) {
        if (prop.includes('workers_cnt')) {
          if (watchedData[prop]) {
            totalWHours += Number(+watchedData[prop]);
          }
        }
      }
      setWHours(totalWHours);
    }
  }, [watchedData]);

  useEffect(() => {
    if (Object.keys(watchedData).length > 0) {
      let totalPriceStepOne = 0;
      for (const prop in watchedData) {
        if (prop.includes('w_price_step_one')) {
          if (watchedData[prop]) {
            totalPriceStepOne += Number(+watchedData[prop]);
          }
        }
      }
      setWPriceStepOne(totalPriceStepOne);
    }
  }, [watchedData]);

  useEffect(() => {
    if (Object.keys(watchedData).length > 0) {
      let totalPriceStepTwo = 0;
      for (const prop in watchedData) {
        if (prop.includes('w_price_step_two')) {
          if (watchedData[prop]) {
            totalPriceStepTwo += Number(+watchedData[prop]);
          }
        }
      }
      setWPriceStepTwo(totalPriceStepTwo);
    }
  }, [watchedData]);

  useEffect(() => {
    if (Object.keys(watchedData).length > 0) {
      let totalPrice = 0;
      for (const prop in watchedData) {
        if (prop.match(/\d+\_(price)\b/g)) {
          if (watchedData[prop]) {
            totalPrice += Number(+watchedData[prop]);
          }
        }
      }
      setPrice(totalPrice);
    }
  }, [watchedData]);

  useEffect(() => {
    if (Object.keys(watchedData).length > 0) {
      let totalWPrice = 0;
      for (const prop in watchedData) {
        if (prop.match(/\d+\_(w_price)\b/g)) {
          if (watchedData[prop]) {
            totalWPrice += Number(+watchedData[prop]);
          }
        }
      }
      setWPrice(totalWPrice);
    }
  }, [watchedData]);

  return {
    wHours,
    wPriceStepOne,
    wPriceStepTwo,
    price,
    wPrice,
  };
};
