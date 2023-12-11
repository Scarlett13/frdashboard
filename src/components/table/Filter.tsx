/* eslint-disable @typescript-eslint/no-explicit-any */
import { RowData, Table } from '@tanstack/react-table';
import clsx from 'clsx';
import * as React from 'react';
// import { useState } from 'react';
import { FiSearch, FiXCircle } from 'react-icons/fi';

import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import DateTimeRangePicker from '../forms/date-time-range-picker';

type FilterProps<T extends RowData> = {
  table: Table<T>;
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>> | null;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>> | null;
} & React.ComponentPropsWithoutRef<'div'>;

const DEBOUNCE_MS = 300;
// const inter = Inter({ subsets: ['latin'] });

export default function Filter<T extends RowData>({
  className,
  table,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  ...rest
}: FilterProps<T>) {
  const [filter, setFilter] = React.useState('');

  const handleClearFilter = () => {
    table.setGlobalFilter('');
    setFilter('');
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      table.setGlobalFilter(filter);
    }, DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [filter, table]);

  const onStartChange = (dates: any) => {
    if (!setEndDate || !setStartDate) {
      return;
    }

    logger(dates);

    if (!dates) {
      const timeout = setTimeout(() => {
        setEndDate(null);
        setStartDate(null);
      }, DEBOUNCE_MS);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      if (endDate && dates > endDate) {
        setEndDate(dates);
      }

      setStartDate(dates);
    }, DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  };

  const onEndChange = (dates: any) => {
    if (!setEndDate || !setStartDate) {
      return;
    }

    if (!dates) {
      const timeout = setTimeout(() => {
        setEndDate(null);
      }, DEBOUNCE_MS);
      return () => clearTimeout(timeout);
    }

    logger(dates);

    const timeout = setTimeout(() => {
      if (!startDate) {
        setStartDate(dates);
      }

      setEndDate(dates);
    }, DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  };

  return (
    <>
      <div
        className={clsxm(
          'relative mt-1 flex w-full flex-row gap-8 self-start',
          className
        )}
        {...rest}
      >
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          <FiSearch className='text-xl text-typo' />
        </div>
        <input
          type='text'
          value={filter ?? ''}
          onChange={(e) => {
            setFilter(String(e.target.value));
          }}
          className={clsx(
            'rounded-lg shadow-sm',
            'min-h-[2.25rem] py-0 px-9 md:min-h-[2.5rem]',
            'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
          )}
          placeholder='Search...'
        />

        {table.getState().globalFilter !== '' && (
          <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
            <button type='button' onClick={handleClearFilter} className='p-1'>
              <FiXCircle className='text-xl text-typo-icons' />
            </button>
          </div>
        )}

        <DateTimeRangePicker
          startDate={startDate}
          endDate={endDate}
          setStartDate={onStartChange}
          setEndDate={onEndChange}
        />
      </div>
    </>
  );
}
