'use client'

import { Coupon } from '../../types/coupon'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { EditCouponForm } from './edit-coupon-form'
import { DeleteCouponForm } from './delete-coupon-form'

const formatDate = (dateString: string) => {
    const date = new Date(dateString) // Parse the date from the string
    const formatter = new Intl.DateTimeFormat('es-MX', {
        timeZone: 'America/Monterrey',
        dateStyle: "short",
        // timeStyle: "short"
        // second: 'numeric',
    })
    return formatter.format(date)
}

interface CouponTableProps {
    coupons: Coupon[]
}

export function CouponTable({ coupons }: CouponTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow className='hover:bg-transparent bg-gray-100'>
                    {/* <TableHead>ID</TableHead> */}
                    <TableHead>Code</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Active</TableHead>
                    <TableHead className='hidden md:table-cell'>Stripe Validated</TableHead>
                    <TableHead>Date Created</TableHead>
                    <TableHead className='text-center'>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {coupons.map((coupon) => (
                    <TableRow key={coupon.id}>
                        {/* <TableCell>{coupon.id}</TableCell> */}
                        <TableCell className="font-medium">{coupon.code}</TableCell>
                        <TableCell>{coupon.percentage}%</TableCell>
                        <TableCell>
                            <Badge variant={"secondary"} className={coupon.active ? "bg-green-200" : "bg-red-200"}>
                                {coupon.active ? 'Active' : 'Inactive'}
                            </Badge>
                        </TableCell>
                        <TableCell className='hidden md:table-cell'>
                            <Badge variant={"secondary"} className={coupon.stripe_validated ? "bg-green-200" : "bg-red-200"}>
                                {coupon.stripe_validated ? 'Validated' : 'Not Validated'}
                            </Badge>
                        </TableCell>
                        <TableCell className='text-black'>{formatDate(coupon.created_at)}</TableCell>
                        <TableCell className='flex space-x-2 justify-center'>
                            <EditCouponForm coupon={coupon} />
                            {/* <DeleteCouponForm coupon={coupon} /> */}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

