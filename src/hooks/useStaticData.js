import React from 'react'
import { useSelector } from 'react-redux';
import { selectAllOffices, selectOfficesTotal } from '../store/staticData/staticDataSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAndSetOffices } from '../store/staticData/staticDataThunks';

export const useStaticData = () => {
    const dispatch = useDispatch();
    const offices = useSelector(selectAllOffices) || [];
    const officesLoaded = useSelector(selectOfficesTotal) > 0;

      useEffect(() => {
        if(!officesLoaded) dispatch(fetchAndSetOffices())
      }, [officesLoaded])

  return {
    offices
  }
}
