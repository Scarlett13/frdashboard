'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// import { useForm } from 'react-hook-form';
import clsxm from '@/lib/clsxm';

import { Icons } from '@/components/default-icons';
// import logger from '@/lib/logger';
// import { Icons } from '@/components/default-icons';
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
      <div className='mb-4 flex flex-row items-center justify-center gap-4'>
        {/* <Icons.menu className='ml-2 h-8 w-8' /> */}
        <Typography variant='h2' className='text-5xl'>
          VMS
        </Typography>
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
        const Icon = Icons[item.icon || 'arrowRight'];
        return (
          item.href && (
            <div
              key={index}
              className='flex w-full flex-row items-center justify-between px-2'
            >
              <Link className='w-full' href={item.disabled ? '#' : item.href}>
                <span
                  className={clsxm(
                    'hover:text-accent-foreground justify-left group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-white',
                    path === item.href
                      ? 'bg-primary-500 text-white hover:bg-primary-800 hover:text-gray-200'
                      : 'transparent',
                    item.disabled && 'cursor-not-allowed opacity-80'
                  )}
                >
                  <Icon className='mr-2 h-5 w-5' />
                  {/* <Icons[item.icon || 'arrowRight']/> */}
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
