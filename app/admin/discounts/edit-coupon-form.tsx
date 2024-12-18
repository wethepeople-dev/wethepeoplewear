'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Pencil } from 'lucide-react'
import { Coupon } from '../../types/coupon'
import { set } from 'date-fns'

interface EditCouponFormProps {
    coupon: Coupon
}

export function EditCouponForm({ coupon }: EditCouponFormProps) {
    const [open, setOpen] = useState(false)
    const [code, setCode] = useState(coupon.code)
    const [isActive, setIsActive] = useState(coupon.active)
    const [saving, setSaving] = useState(false)

    const handleToggle = (checked: boolean) => {
        setIsActive(checked)
    }

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            const response = await fetch('/api/editDiscountCode', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, active: isActive }),
            });

            if (response.ok) {
                // Force refresh the page
                window.location.reload()
            } else {
                console.log('response', response);
            }

        } catch (err) {
            console.error('Failed to update the discount code:', err);
        }

        setOpen(false)
        setSaving(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Coupon Code: {code}</DialogTitle>
                    <DialogDescription>
                        Activate or deactivate the coupon code here.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2 py-4">
                    <Switch
                        id="coupon-active"
                        checked={isActive}
                        onCheckedChange={handleToggle}
                    />
                    <Label htmlFor="coupon-active">
                        {isActive ? 'Coupon Active' : 'Coupon Inactive'}
                    </Label>
                </div>
                <div className="flex justify-end">
                    <Button onClick={handleUpdate} variant="default" className="ml-2" disabled={isActive === coupon.active}>
                        {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

