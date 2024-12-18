export interface Coupon {
    id: string;
    code: string;
    percentage: number;
    active: boolean;
    stripe_validated: boolean;
    created_at: string;
}