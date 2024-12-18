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
import { Plus } from 'lucide-react'

export function AddCouponForm() {
    const [open, setOpen] = useState(false)
    const [code, setCode] = useState('')
    const [percentageError, setPercentageError] = useState(false)
    const [percentage, setPercentage] = useState('')
    const [active, setActive] = useState(true)
    const [creating, setCreating] = useState(false)


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setCreating(true)
        if (Number(percentage) < 1 || Number(percentage) > 100) {
            setPercentageError(true)
            setCreating(false)
            return
        }
        // Here you would typically send the new coupon data to your backend
        console.log('New Coupon:', { code, percentage: Number(percentage), active })

        try {
            const response = await fetch(`/api/createDiscountCode`, {
                method: "POST",
                body: JSON.stringify({ code: code, percentage: percentage, active: active }),
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
        setCreating(false)
        setPercentageError(false)
        // Reset form
        setCode('')
        setPercentage('')
        setActive(true)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add New Coupon
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Coupon</DialogTitle>
                    <DialogDescription>
                        Create a new coupon code here.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="code" className="text-right">
                                Code
                            </Label>
                            <Input
                                id="code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="percentage" className="text-right">
                                Percentage
                            </Label>
                            <Input
                                id="percentage"
                                type="number"
                                value={percentage}
                                onChange={(e) => setPercentage(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="active" className="text-right">
                                Active
                            </Label>
                            <Switch
                                id="active"
                                checked={active}
                                onCheckedChange={setActive}
                            />
                        </div>
                    </div>
                    {percentageError && (
                        <p className="text-red-500 text-sm py-4 text-center">Percentage must be a number between 1 and 100.</p>
                    )}
                    <DialogFooter>
                        <Button type="submit" disabled={creating}>
                            {creating ? 'Creating...' : 'Create Coupon'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}