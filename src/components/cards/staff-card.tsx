import Image from 'next/image';
import { useRouter } from 'next/router';

import clsxm from '@/lib/clsxm';

import { Icons } from '../default-icons';

interface IStaffCardProps {
  staffId: string;
  imageSource: string;
  imageAlt: string;
  staffName: string;
  staffDepartment: string;
  faceFeaturesRegistered: boolean;
  isActive: boolean;
}

export default function StaffCard({
  staffDepartment,
  staffId,
  staffName,
  imageAlt,
  imageSource,
  faceFeaturesRegistered,
  isActive,
}: IStaffCardProps) {
  const router = useRouter();
  return (
    <div
      className='w-[300px] overflow-hidden rounded border-2 border-gray-300 shadow-lg hover:cursor-pointer'
      key={staffId}
      onClick={() => {
        router.push(`/staff/${staffId}`);
      }}
    >
      <div>
        <div className='flex w-full flex-row items-center justify-center'>
          <Image
            className='mt-4 h-20 w-20'
            width={150}
            height={150}
            src={`http://192.168.10.31:5000/file/image/${imageSource}`}
            alt={imageAlt}
          />
        </div>

        <div className='px-6 py-4'>
          <div className='mb-2 text-xl font-bold'>{staffName}</div>
          <p className='text-xl text-gray-900'>{staffDepartment}</p>
        </div>
      </div>
      <div className='w-full border border-gray-200' />
      <div className='flex flex-col px-6 pt-4 pb-2'>
        <div
          className={clsxm(
            'mr-2 mb-2 flex flex-row items-center gap-4 rounded-full px-3 py-1 text-sm font-semibold text-gray-700',
            isActive ? 'bg-green-200' : 'bg-red-200'
          )}
        >
          <Icons.user className='h-6 w-6' />
          {isActive ? 'Active' : 'Inactive'}
        </div>
        <div
          className={clsxm(
            'mr-2 mb-2 flex flex-row items-center gap-4 rounded-full px-3 py-1 text-sm font-semibold text-gray-700',
            faceFeaturesRegistered ? 'bg-green-200' : 'bg-red-200'
          )}
        >
          <Icons.user className='h-6 w-6' />
          {faceFeaturesRegistered ? 'Face registered' : 'Face not registered'}
        </div>
      </div>
    </div>
  );
}
