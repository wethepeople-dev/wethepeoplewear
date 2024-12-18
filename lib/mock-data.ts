import { Coupon } from "@/app/types/coupon";

export const mockCoupons: Coupon[] = [
    {
        id: '1',
        code: 'SUMMER2023',
        percentage: 20,
        active: true,
        stripe_validated: true,
        created_at: '2023-06-01T00:00:00Z',
    },
    {
        id: '2',
        code: 'WELCOME10',
        percentage: 10,
        active: true,
        stripe_validated: true,
        created_at: '2023-05-15T00:00:00Z',
    },
    {
        id: '3',
        code: 'FLASH50',
        percentage: 50,
        active: false,
        stripe_validated: true,
        created_at: '2023-04-01T00:00:00Z',
    },
    {
        id: '4',
        code: 'NEWUSER25',
        percentage: 25,
        active: true,
        stripe_validated: false,
        created_at: '2023-06-10T00:00:00Z',
    },
    {
        id: '5',
        code: 'LOYALTY15',
        percentage: 15,
        active: true,
        stripe_validated: true,
        created_at: '2023-03-01T00:00:00Z',
    },
];

