'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
// import usePush from '@utils/UsePush';
// import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { provideLoginRequest, setTokenCookie } from '@/lib/api';
// import toast from 'react-hot-toast';
import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import PasswordInput from '@/components/forms/PasswordInput';
import Skeleton from '@/components/Skeleton';

import { FormFields } from '@/types/form';

const AuthLoginfields: FormFields[] = [
  {
    labelText: 'Username',
    labelFor: 'UserLogin',
    id: 'UserLogin',
    name: 'UserLogin',
    type: 'text',
    autoComplete: 'UserLogin',
    isRequired: true,
    placeholder: 'Username',
    titlekey: 'title_userlogin',
  },
  {
    labelText: 'Password',
    labelFor: 'UserPassword',
    id: 'UserPassword',
    name: 'UserPassword',
    type: 'password',
    autoComplete: 'current_password',
    isRequired: true,
    placeholder: 'Password',
    titlekey: 'title_password',
  },
];

export type SignInWithEmailAndPassword = {
  UserLogin: string;
  UserPassword: string;
};

interface LoginFormProps {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export default function LoginForm({ loading, setLoading }: LoginFormProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const methods = useForm<SignInWithEmailAndPassword>({
    mode: 'onTouched',
  });
  const { handleSubmit } = methods;

  async function onSubmit(data: SignInWithEmailAndPassword) {
    setLoading(true);
    logger({ data });

    const loginRequest = provideLoginRequest(data);
    const loginResponse = await fetch(loginRequest);
    const loginBody = await loginResponse.json();

    if (!loginResponse.ok || !loginBody?.Success) {
      setLoading(false);
      return toast.error(loginBody.Message || 'Unknown error happens...');
    }

    // setLoading(false);
    const { TokenRefresh, TokenAccess } = loginBody;
    await setTokenCookie(TokenAccess, TokenRefresh);
    toast.success('Success login, redirecting...');
    router.refresh();
  }

  if (!mounted) {
    return (
      <>
        <Skeleton className='my-2 h-8 max-w-sm' />
        <Skeleton className='mb-8 mt-2 h-8 max-w-sm' />
      </>
    );
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='max-w-sm space-y-4 text-left'
      >
        {AuthLoginfields.map((field) =>
          field.type === 'password' ? (
            <PasswordInput
              key={field.titlekey}
              id={field.id}
              label={field.labelText}
              type={field.type}
              disabled={loading}
              validation={{
                required: `${field.name} must be filled!`,
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters!',
                },
              }}
              placeholder={field.placeholder}
              helperText={field.helpertext ? field.helpertext : undefined}
            />
          ) : (
            <Input
              key={field.titlekey}
              id={field.id}
              type={field.type}
              label={field.labelText}
              disabled={loading}
              validation={{
                required: `${field.name} must be filled!`,
                // pattern: {
                //   value:
                //     /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gi,
                //   message: 'Please inout a valid email!',
                // },
              }}
              placeholder={field.placeholder}
              helperText={field.helpertext ? field.helpertext : undefined}
            />
          )
        )}

        <p></p>

        <Button
          type='submit'
          isLoading={loading}
          className='w-full items-center justify-center border bg-primary-500 text-center shadow-sm'
        >
          Login
        </Button>
      </form>
    </FormProvider>
  );
}
