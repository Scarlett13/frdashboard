'use client';

// import { useSelectedLayoutSegment } from 'next/navigation';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

import UnstyledLink from '@/components/links/UnstyledLink';

import { siteConfig } from '@/config/site';

import { MobileNav } from '../mobilenav/mobile-nav';

import { MainNavItem } from '@/types';

interface MainNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

export function MainNav({ items, children }: MainNavProps) {
  // const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <div className='flex gap-6 md:gap-10'>
      <UnstyledLink href='/' className='hidden items-center space-x-2 md:flex'>
        {/* <Icons.logo /> */}
        <span className='hidden font-bold sm:inline-block'>
          {siteConfig.name}
        </span>
      </UnstyledLink>
      {items?.length ? (
        <nav className='hidden gap-6 md:flex'>
          {items?.map((item, index) => (
            <UnstyledLink
              key={index}
              href={item.disabled ? '#' : item.href}
              className={clsxm(
                'flex items-center text-lg font-medium transition-colors hover:text-gray-500 sm:text-sm',

                item.disabled && 'cursor-not-allowed opacity-80'
              )}
            >
              {item.title}
            </UnstyledLink>
          ))}
        </nav>
      ) : null}
      <button
        className='flex items-center space-x-2 md:hidden'
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {/* {showMobileMenu ? <Icons.close /> : <Icons.logo />} */}
        <span className='font-bold'>Menu</span>
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  );
}
