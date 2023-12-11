import cookie from 'cookie';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import Breadcrumb from '@/components/Breadcrumb';
import Button from '@/components/buttons/Button';
// import { Icons } from '@/components/default-icons';
import AuthLayout from '@/components/layout/auth-layout';
import Card from '@/components/layout/dashboard/Card';
import Layout from '@/components/layout/Layout';
import ModalAddStaff from '@/components/modal/modal-add-staff';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import { Person } from '@/types/person';

const fetcher = (url: string, token: string) =>
  fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then((res) =>
    res.json()
  );

export default function StaffDetailPage({
  accessToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [staff, setStaff] = useState<Person | null>(null);

  const router = useRouter();
  const { staffid } = router.query;

  const url = `http://192.168.10.31:5000/staff/${staffid}`;

  // Line 32:  use the useFetch hook to get the products
  const { data, error } = useSWR(url, (url) => fetcher(url, accessToken));

  useEffect(() => {
    if (data) {
      setStaff(data);
    }
  }, [data, error]);

  return (
    <Layout>
      <Seo templateTitle={`${staff?.PersonName}`} />

      <AuthLayout navitem={null}>
        <div className='container mx-auto max-w-full p-10'>
          <Breadcrumb
            className='absolute top-12 left-10 mt-4 md:left-12'
            crumbs={['/staff', '/staff/:staffid']}
          />
          <div className='mt-10 flex w-full flex-row items-start justify-center'>
            <Card className='mx-4 h-3/4 w-full bg-gray-100 p-8 lg:mx-0 lg:w-1/2'>
              <Card.Section>
                {staff && (
                  <>
                    <div className='flex w-full flex-row items-center justify-center'>
                      <Image
                        className='my-4'
                        width={150}
                        height={150}
                        src={`http://192.168.10.31:5000/file/image/${staff.PersonImage}`}
                        alt={`${staff.PersonName}'s image`}
                      />
                    </div>
                    <Typography variant='h2' color='primary'>
                      {staff.PersonName} - {staff.PersonDepartment}
                    </Typography>
                    <Typography
                      variant='h3'
                      color={staff.FaceFeatures ? 'success' : 'danger'}
                    >
                      Face features{' '}
                      {staff.FaceFeatures ? 'registered' : 'not registered'}
                    </Typography>
                    <Typography
                      variant='h3'
                      color={staff.IsActive ? 'success' : 'danger'}
                    >
                      Staff is {staff.IsActive ? 'active' : 'inactive'}
                    </Typography>
                  </>
                )}
              </Card.Section>
              <Card.Section>
                <div className='flex justify-end gap-2'>
                  <Button variant='danger'>Delete Staff</Button>
                  {staff?.FaceFeatures ? (
                    <></>
                  ) : (
                    <Button>Register Face Features</Button>
                  )}
                  <ModalAddStaff
                    isEdit={true}
                    setSuccess={undefined}
                    staffId={staffid ? Number(staffid) : 0}
                    imagesource={staff?.PersonImage}
                  />
                </div>
              </Card.Section>
            </Card>
          </div>
          <div className='py-4' />
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
