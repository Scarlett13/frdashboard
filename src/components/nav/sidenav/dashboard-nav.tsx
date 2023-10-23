'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// import { useForm } from 'react-hook-form';
import clsxm from '@/lib/clsxm';

// import logger from '@/lib/logger';
import { Icons } from '@/components/default-icons';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/Tooltip';
import Typography from '@/components/typography/Typography';

import { CustomSidebarNavItem, SidebarNavItem } from '@/types';

interface DashboardNavProps {
  items: CustomSidebarNavItem[];
}

export function DashboardNav({ items }: DashboardNavProps) {
  // const [datequerystate, setDateQueryState] = useState<Date | null>(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!items?.length) {
    return null;
  }

  if (!mounted) {
    return <></>;
  }

  return (
    <nav className='fixed z-10 grid w-[250px] items-start gap-2 overflow-auto'>
      <div className='mb-4'>
        <Icons.menu className='ml-2 h-8 w-8' />
        {/* <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DatePicker
              id='datequery'
              name='datequery'
              placeholder='Select date'
              label='Search diary based on date..'
              withPortal
              defaultValue={new Date().toISOString()}
              todayButton='Today'
              customState={setDateQueryState}
              rightNode={
                <button
                  onClick={() => {
                    datequerystate && new Date();
                    setValue('datequery', new Date());
                  }}
                >
                  <Icons.today className='h-4 w-4' />
                </button>
              }
            />
          </form>
        </FormProvider> */}
      </div>
      <div>
        {items.map((item, index) => {
          return (
            <section key={index}>
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Typography
                      variant='b2'
                      className={clsxm(
                        'text-md group flex items-center rounded-md px-3 py-2 font-bold',
                        'transparent',
                        'opacity-80'
                      )}
                    >
                      {item.category}
                    </Typography>
                  </TooltipTrigger>
                  <TooltipContent side='bottom'>
                    <Typography variant='b2'>{item.catdesc}</Typography>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {item.items ? (
                <>
                  <DashboardSideNavItems items={item.items} />
                </>
              ) : null}
            </section>
          );
        })}
      </div>
    </nav>
  );
}

interface DashboardNavItemsProps {
  items: SidebarNavItem[];
}

export function DashboardSideNavItems({ items }: DashboardNavItemsProps) {
  const path = usePathname();
  return (
    <>
      {items.map((item, index) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // const Icon = Icons[item.icon || 'arrowRight'];
        return (
          item.href && (
            <div
              key={index}
              className='flex w-full flex-row items-center justify-between px-2'
            >
              <Link className='w-full' href={item.disabled ? '/' : item.href}>
                <span
                  className={clsxm(
                    'hover:text-accent-foreground group flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-white',
                    path === item.href ? 'bg-white' : 'transparent',
                    item.disabled && 'cursor-not-allowed opacity-80'
                  )}
                >
                  <span>{item.title}</span>
                </span>
              </Link>
              {/* <Icon className='mr-2 h-6 w-6' /> */}
            </div>
          )
        );
      })}
    </>
  );
}
