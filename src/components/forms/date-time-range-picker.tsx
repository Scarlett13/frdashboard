/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormProvider, useForm } from 'react-hook-form';

import logger from '@/lib/logger';

import DatePicker from './DatePicker';

type CustomDateTimeRangePicker = {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
};

export default function DateTimeRangePicker({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: CustomDateTimeRangePicker) {
  const methods = useForm<any>({
    mode: 'onTouched',
  });
  const { handleSubmit } = methods;

  async function onSubmit(data: any) {
    logger({ data });
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex w-full flex-row gap-4'
      >
        <DatePicker
          selected={startDate}
          customchange={setStartDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          label={null}
          isClearable
          showTimeInput
          timeFormat='HH:mm'
          timeIntervals={15}
          timeCaption='time'
          dateFormat='dd-MM-yyyy HH:mm aa'
          showclearbutton={startDate || endDate ? true : false}
          placeholder='Start Date'
          id='1'
        />
        <DatePicker
          selected={endDate}
          customchange={setEndDate}
          selectsEnd
          showTimeInput
          timeFormat='HH:mm'
          timeIntervals={15}
          timeCaption='time'
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          label={null}
          isClearable
          dateFormat='dd-MM-yyyy HH:mm aa'
          showclearbutton={endDate || startDate ? true : false}
          placeholder='End Date'
          id='2'
        />
      </form>
    </FormProvider>
  );
}
