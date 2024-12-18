'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Trash2 } from 'lucide-react'
import { Coupon } from '../../types/coupon'

interface DeleteCouponFormProps {
    coupon: Coupon
}

export function DeleteCouponForm({ coupon }: DeleteCouponFormProps) {
    const [open, setOpen] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const handleDelete = async () => {
        setDeleting(true)

        try {
            const response = await fetch(`/api/deleteDiscountCode`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code: coupon.code }),
            });

            if (response.ok) {
                // Force refresh the page
                window.location.reload()
            } else {
                console.log('response', response);
            }

        } catch (error) {
            console.log('error', error);
        }

        setOpen(false)
        setDeleting(false)
        window.location.reload()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete Coupon</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this coupon code: {coupon.code}? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDelete}>
                        {deleting ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

