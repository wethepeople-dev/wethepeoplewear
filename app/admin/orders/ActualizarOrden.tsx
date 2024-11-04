'use client'

import { useEffect, useState } from "react"
import { DialogTrigger, Dialog, DialogDescription, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"

import { AlertCircle, XCircle, X } from 'lucide-react'
import { Alert } from "@/components/ui/alert"

export type OrderData = {
    order_id: string;
    created_at: string;
    product_quantity: number;
    final_price: number;
    shipping_status: string;
    shipping_method: string;
    completed: boolean;
    tracking_id: string;
    tracking_url: string;
    delivery_email_sent: boolean;
    name: string;
    email: string;
    phone: string;
    address: string;
    municipio: string;
    city: string;
    postal_code: string;
    state: string;
    country: string;
};

export default function ActualizarOrden({
    onUpdateOrder,
    ...order
}: OrderData & {
    onUpdateOrder: (updatedOrder: OrderData) => void;
}) {

    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        status: order.shipping_status,
        trackingId: order.tracking_id,
        trackingUrl: order.tracking_url,
        completed: order.completed,
    })

    const handleChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const editOrder = async () => {
        setSaving(true);
        try {
            const response = await fetch('/api/updateOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId: order.order_id,
                    status: formData.status,
                    trackingId: formData.trackingId,
                    trackingUrl: formData.trackingUrl,
                    completed: formData.completed,
                }),
            });

            const data = await response.json();
            onUpdateOrder({ ...order, ...formData });

            setSaving(false);
            // setOpen(false);

            if (response.ok) {
                console.log('Order updated successfully:', data);
            } else {
                console.error('Failed to update order:', data.error);
            }
        } catch (error) {
            console.error('Error in editOrder:', error);
        }
    };

    return (
        <>

            <Dialog>

                <DialogTrigger asChild>
                    <div className="hover:cursor-pointer hover:bg-gray-100 relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                        <Pencil className="h-4" /> Actualizar
                    </div>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">

                    <DialogHeader>
                        <DialogTitle>Actualizar Orden</DialogTitle>
                        <DialogDescription>
                            Actualiza la información de la orden
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 pb-4">

                        {order.delivery_email_sent ? (
                            <Alert className={`bg-yellow-50 border-yellow-200 text-yellow-800 py-3 px-4`}>
                                <div className="flex items-center space-x-3">
                                    <AlertCircle className="h-8 w-8" />
                                    <p className="text-sm font-medium">El correo de este pedido ya fue enviado.<br />Marca como <strong>&quot;Completed&quot;</strong> solo si el cliente ya recibió su paquete.</p>
                                </div>
                                {/* <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setIsVisible(false)}
                                        className="text-gray-400 hover:text-gray-500 flex-shrink-0 ml-3 h-6 w-6"
                                        aria-label="Dismiss"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button> */}
                            </Alert>
                        )
                            :
                            <>
                                <Alert className={`bg-gray-50 border-gray-200 text-gray-800 py-3 px-4`}>
                                    <div className="flex items-center space-x-3">
                                        <AlertCircle className="h-8 w-8" />
                                        <p className="text-sm font-medium">
                                            Este es un pedido tipo <strong>&quot;{order.shipping_method}&quot;</strong><br />Para que el correo sea enviado se debe marcar estatus como &quot;Delivered&quot;{order.shipping_method != 'collectif' ? ` y haber proporcionado un Tracking URL` : ''}.
                                        </p>
                                    </div>
                                </Alert>
                            </>
                        }

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                Estatus de envio
                            </Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value) => handleChange('status', value)}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="delivered">Delivered</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="trackingId" className="text-right">
                                Tracking ID
                            </Label>
                            <Input
                                id="trackingId"
                                value={formData.trackingId}
                                onChange={(e) => handleChange('trackingId', e.target.value)}
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="trackingUrl" className="text-right">
                                Tracking URL
                            </Label>
                            <Input
                                id="trackingUrl"
                                value={formData.trackingUrl}
                                onChange={(e) => handleChange('trackingUrl', e.target.value)}
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="completed" className="text-right">
                                Completed
                            </Label>
                            <Switch
                                id="completed"
                                checked={formData.completed}
                                onCheckedChange={(checked) => handleChange('completed', checked)}
                            />
                        </div>

                    </div>

                    <DialogFooter>
                        <Button onClick={editOrder}>
                            {saving ? 'Guardando...' : 'Guardar cambios'}
                        </Button>
                    </DialogFooter>

                </DialogContent>
            </Dialog>
        </>
    );
}
