import cookie from 'cookie';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { HiOutlineSearch, HiOutlineXCircle } from 'react-icons/hi';
import useSWR from 'swr';

import logger from '@/lib/logger';

import StaffCard from '@/components/cards/staff-card';
// import { Icons } from '@/components/default-icons';
import Input from '@/components/forms/Input';
import AuthLayout from '@/components/layout/auth-layout';
import Layout from '@/components/layout/Layout';
import ModalAddStaff from '@/components/modal/modal-add-staff';
import Pagination from '@/components/pagination-page';
import Seo from '@/components/Seo';
import Skeleton from '@/components/Skeleton';

import UnauthPage from '../zzzsandbox/boilerplate/unauth.page';

import { Person } from '@/types/person';

const fetcher = (url: string, token: string) =>
  fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then((res) =>
    res.json()
  );

export default function StaffPage({
  accessToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  /** ---------- BEGIN FORM REGION --------- */
  const [persons, setPersons] = useState<Person[]>([]);
  const [filteredPersons, setFilteredPersons] = useState<Person[]>([]);
  const [filterString, setFilterString] = useState<string>('');

  const methods = useForm({
    mode: 'onTouched',
  });
  const { setValue, handleSubmit } = methods;

  async function onSubmit(data: unknown) {
    logger(data);
    return;
  }

  /** ---------- END FORM REGION --------- */

  /** ---------- BEGIN FETCHER REGION --------- */
  const router = useRouter();
  const query = router.query;
  const page = (query.page as string) ?? '1';
  const perPage = (query.perPage as string) ?? '10';

  const url = `http://192.168.10.31:5000/person?PerPage=${perPage}&Page=${page}`;

  // Line 32:  use the useFetch hook to get the products
  const { data, error, isLoading } = useSWR(url, (url) =>
    fetcher(url, accessToken)
  );

  /** ---------- END FETCHER REGION --------- */

  /** ---------- BEGIN USE EFFECT REGION --------- */

  useEffect(() => {
    if (data && data.serialized_items) {
      setPersons(data.serialized_items);
    }
    logger(data);
  }, [data, error]);

  useEffect(() => {
    if (!filterString) {
      setFilteredPersons(persons);
    } else {
      const filteredArray: Person[] = [];

      data?.serialized_items?.forEach((item: Person) => {
        let found = false; // Flag to track if the search keyword is found in any key
        // Iterate through the keys of each object
        Object.keys(item).forEach((key) => {
          logger(key);
          if (
            item[key as keyof typeof item] &&
            item[key as keyof typeof item]
              .toString()
              .toLowerCase()
              .includes(filterString.toLowerCase())
          ) {
            found = true;
          }
        });

        if (found) {
          filteredArray.push(item);
        }
      });

      setFilteredPersons(filteredArray);
    }
  }, [data?.serialized_items, filterString, persons]);

  /** ---------- END USE EFFECT REGION --------- */

  return (
    <Layout>
      <Seo templateTitle='List Staffs' />

      <AuthLayout navitem={null}>
        <div className='container mx-auto max-w-full p-10'>
          {isLoading ? (
            <>
              <Skeleton className='h-20 w-full' />
              <Skeleton className='h-20 w-full' />
              <Skeleton className='h-20 w-full' />
            </>
          ) : error ? (
            <UnauthPage />
          ) : (
            <>
              <div className='my-4 flex w-full flex-row justify-between px-0 md:px-8'>
                <ModalAddStaff isEdit={false} setSuccess={undefined} />
                <FormProvider {...methods}>
                  <form onSubmit={handleSubmit(onSubmit)} className='w-1/2'>
                    <Input
                      key='filterstaff'
                      id='filterstaff'
                      type='text'
                      label={null}
                      placeholder='Filter your staff'
                      leftIcon={HiOutlineSearch}
                      rightNode={
                        <button
                          type='button'
                          className='p-1'
                          onClick={() => {
                            setValue('filterstaff', '');
                            setFilterString('');
                          }}
                        >
                          <HiOutlineXCircle className='text-xl text-typo-icons' />
                        </button>
                      }
                      customState={setFilterString}
                    />
                  </form>
                </FormProvider>
              </div>

              <div className='grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {filteredPersons && filteredPersons.length > 0 ? (
                  filteredPersons.map((item) => {
                    return (
                      <StaffCard
                        key={item.id}
                        staffId={`${item.id}`}
                        imageSource={item.PersonImage}
                        imageAlt={`${item.PersonName}'s image`}
                        staffName={item.PersonName}
                        staffDepartment={item.PersonDepartment}
                        faceFeaturesRegistered={item.FaceFeatures}
                        isActive={item.IsActive}
                      />
                    );
                  })
                ) : (
                  <p>No staff found</p>
                )}
              </div>
              <div className='py-4' />
              <Pagination
                page={parseInt(page)}
                perPage={parseInt(perPage)}
                itemCount={
                  data?.total_page
                    ? (data.total_page + 1) * parseInt(perPage)
                    : 0
                }
              />
            </>
          )}
        </div>
      </AuthLayout>
    </Layout>
  );
}

export const getServerSideProps = (async (context) => {
  const cookies = cookie.parse(context.req.headers.cookie ?? '');
  const appCookie = cookies?.['uss_sess'] ?? '';
  const parsedCookies = appCookie ? JSON.parse(appCookie) : {};
  const accessToken = parsedCookies?.accessToken ?? null;

  if (!accessToken) {
    return { props: { accessToken: null } };
  }

  return { props: { accessToken } };
}) satisfies GetServerSideProps<{
  accessToken: string | null;
}>;
