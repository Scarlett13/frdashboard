// import { User } from "@prisma/client"
// import type { Icon } from "lucide-react"

import { Icons } from '@src/components/default-icons';

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type CustomSidebarNavItem = {
  category: string;
  catdesc: string;
  items: SidebarNavItem[];
};

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type FormFields = {
  labelText: string;
  labelFor: string;
  id: string;
  name: string;
  type: string;
  autoComplete: string;
  isRequired: boolean;
  placeholder: string;
  titlekey: string;
  helpertext?: string | null;
};

export type DocsConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type DashboardConfig = {
  mainNav: MainNavItem[];
  mainNavAuth: MainNavItem[];
  sidebarNav: CustomSidebarNavItem[];
  identitiesNav: CustomSidebarNavItem[];
  identitiesIdNav: CustomSidebarNavItem[];
  diariesNav: CustomSidebarNavItem[];
  userNav: CustomSidebarNavItem[];
};

export type SubscriptionPlan = {
  name: string;
  description: string;
  stripePriceId: string;
};

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, 'stripeCustomerId' | 'stripeSubscriptionId'> & {
    stripeCurrentPeriodEnd: number;
    isPro: boolean;
  };
