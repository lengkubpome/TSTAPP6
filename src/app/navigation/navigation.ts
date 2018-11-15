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
                        url: '/sample',
                        exactMatch: true
                    },
                    {
                        id: 'product-inventory',
                        title: 'Inventory',
                        type: 'item',
                        url: '/sample',
                        exactMatch: true
                    }
                ]
            }
        ]
    },
    {
        id: 'management',
        title: 'Managements',
        translate: 'NAV.MANAGEMENTS',
        type: 'group',
        children: [
            {
                id: 'admin-user',
                title: 'Admin & User',
                // translate: 'NAV.USERS',
                type: 'item',
                icon: 'supervisor_account',
                url: '/sample',
               
            },
        ]
    }
];
