import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Datepicker from 'react-tailwindcss-datepicker';
import { setDateRange } from '../redux/features/globalStoreSlice';
import logo from '../assets/ps-logo-dark.svg';

const Footer = ({ setFetchingData }) => {
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();
  const handleValueChange = (newValue) => {
    localStorage.setItem('dateRange', JSON.stringify(newValue));
    setFetchingData(true);
    dispatch(setDateRange(newValue));
  };
  const today = new Date().toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
  const yesterday = new Date(
    new Date().setDate(new Date().getDate() - 1),
  ).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });

  useEffect(() => {
    if (window.innerWidth < '768') {
      setIsMobile(true);
    }
  }, [isMobile]);

  return (
    <div className="flex justify-between mt-3 md:mt-4 h-[10%] items-center">
      <div className="w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/5 pr-2 mb-3">
        <img src={logo} alt="provider-science-logo" />
      </div>
      <div className="flex w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 items-center border border-slate-300 rounded-lg relative ml-2 md:ml-0 mb-3">
        <Datepicker
          primaryColor="sky"
          value={
            localStorage.getItem('dateRange')
              ? JSON.parse(localStorage.getItem('dateRange'))
              : { startDate: yesterday, endDate: today }
          }
          onChange={handleValueChange}
          showShortcuts={true}
          inputClassName="xl:text-xl md:text-base text-xs text-sky-500 md:font-bold w-full p-2 rounded-lg bg-white"
          containerClassName="flex items-center justify-start w-full"
          popoverDirection="up"
          placeholder="Select Date Range"
          useRange={isMobile ? false : true}
          displayFormat="MM/DD/YYYY"
        />
      </div>
    </div>
  );
};

export default Footer;
