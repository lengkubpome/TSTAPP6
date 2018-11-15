import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'sample',
                title: 'Sample',
                translate: 'NAV.SAMPLE.TITLE',
                type: 'item',
                icon: 'email',
                url: '/sample',
                badge: {
                    title: '25',
                    translate: 'NAV.SAMPLE.BADGE',
                    bg: '#F44336',
                    fg: '#FFFFFF'
                }
            },

            {
                id: 'product-management',
                title: 'Product Management',
                translate: 'NAV.PRODUCT-MANAGEMENT',
                type: 'collapsable',
                icon: 'shopping_cart',
                children: [
                    {
                        id: 'products',
                        title: 'Products',
                        type: 'item',
                        url: '/apps/product-management/products',
                        exactMatch: true
                    },
                    {
                        id: 'product-inventory',
                        title: 'Inventory',
                        type: 'item',
                        url: '/apps/product-management/inventory',
                        exactMatch: true
                    }
                ]
            }
        ]
    },
    {
        id: 'administration',
        title: 'Administration',
        translate: 'NAV.ADMINISTRATION',
        type: 'group',
        children: [
            {
                id: 'account-management',
                title: 'Account Management',
                // translate: 'NAV.USERS',
                type: 'item',
                icon: 'supervisor_account',
                url: '/',
                exactMatch: true
               
            },
        ]
    }
];
