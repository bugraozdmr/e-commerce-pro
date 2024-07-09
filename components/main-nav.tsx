'use client';

import { cn } from '@/lib/utils'
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react'

export const MainNav = ({
    className,
    ...props
} : React.HTMLAttributes<HTMLElement>) => {
    const pathName = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/${params.storeId}`,
            label: 'Overview',
            active : pathName === `/${params.storeId}`
        },
        {
            href: `/${params.storeId}/categories`,
            label: 'Categories',
            active : pathName === `/${params.categories}`
        },
        {
            href: `/${params.storeId}/sizes`,
            label: 'Sizes',
            active : pathName === `/${params.sizes}`
        },
        {
            href: `/${params.storeId}/colors`,
            label: 'Colors',
            active : pathName === `/${params.colors}`
        },
        {
            href: `/${params.storeId}/products`,
            label: 'Products',
            active : pathName === `/${params.products}`
        },
        {
            href: `/${params.storeId}/orders`,
            label: 'Orders',
            active : pathName === `/${params.orders}`
        },
        {
            href: `/${params.storeId}/billboards`,
            label: 'Billboards',
            active : pathName === `/${params.billboards}`
        },
        {
            href: `/${params.storeId}/settings`,
            label: 'Settings',
            active : pathName === `/${params.storeId}/settings`
        },
    ];

  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6',className)}>
        {
            routes.map((route) => (
                <Link key={route.href} href={route.href} className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
                )}>
                    {route.label}
                </Link>
            ))
        }
    </nav>
  )
}
