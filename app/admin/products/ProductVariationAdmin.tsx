import { cn } from "@/lib/utils"
import { Search, Menu, Settings, Minus, Plus, Pencil } from "lucide-react"
import { use, useEffect, useState } from "react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"

import { formatCurrency } from "@/lib/utils"

interface ProductVariation {
    product_name: string;
    variation_id: string; // UUID
    product_id: string; // UUID
    color: string;
    talla: string;
    precio: number;
    fotos: string[]; // Adjust based on your structure
    stock_qty: number;
}

export default function ProductVariationAdmin({
    onUpdateProductVariation,
    ...p
}: ProductVariation & {
    onUpdateProductVariation: (updatedProduct: ProductVariation & { product_name: string }) => void;
}) {

    const [isOpen, setIsOpen] = useState(false)
    const [price, setPrice] = useState(p.precio)
    const [stock, setStock] = useState(p.stock_qty)

    useEffect(() => {
        if (isOpen == false) {
            setPrice(p.precio)
            setStock(p.stock_qty)
        }
    }, [isOpen])

    const handleSave = async () => {
        try {
            const response = await fetch('/api/updateProductVariation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    variation_id: p.variation_id,
                    stock,
                    price,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update product variation');
            }

            const data = await response.json();
            onUpdateProductVariation({ ...p, precio: price, stock_qty: stock });

            // Close the modal and show a success toast
            setIsOpen(false);
        } catch (error) {
            console.error('Error updating variation:', error);
        }
    };

    const handleStockIncrement = () => {
        setStock(stock + 1)
    }

    const handleStockDecrement = () => {
        setStock(stock - 1)
    }

    return (
        <>
            <TableRow key={p.variation_id} className="m-0 p-0">
                <TableCell className="font-medium items-center">
                    <div className="flex items-center">
                        <img src={p.fotos[0]} className="h-8 mr-4" alt={p.product_name} />
                        <p className="hidden md:block">{p.product_name}</p>
                    </div>
                </TableCell>
                <TableCell>{p.color}</TableCell>
                <TableCell className="text-center">{p.talla}</TableCell>
                <TableCell className={`text-center ${p.stock_qty == 0 ? 'bg-red-300' : p.stock_qty < 3 ? 'bg-yellow-200' : 'bg-green-300'}`}>
                    {p.stock_qty}
                </TableCell>
                <TableCell className="text-center">{formatCurrency(p.precio)}</TableCell>
                <TableCell className="text-center">
                    <Button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        className="rounded-lg font-medium text-gray-300 hover:bg-gray-600"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Product</DialogTitle>
                            </DialogHeader>
                            <div className="grid py-4">
                                <div className="flex justify-center">
                                    <Image
                                        src={p.fotos[0]}
                                        alt={p.product_name}
                                        width={200}
                                        height={200}
                                        className="rounded-md object-cover"
                                    />
                                </div>

                                <div className="py-3">
                                    <p className="text-center font-bold">{p.product_name}</p>
                                    <p className="text-center">{p.talla} - {p.color}</p>
                                </div>

                                <div className="grid gap-4 mx-20">
                                    <div className="">
                                        <Label htmlFor="price" className="text-right">
                                            Precio
                                        </Label>
                                        <Input
                                            id="price"
                                            name="price"
                                            value={price}
                                            onChange={(e) => setPrice(parseFloat(e.target.value))}
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            className="col-span-3 mt-1"
                                        />
                                    </div>
                                    <div className="">
                                        <Label htmlFor="stock" className="text-right">
                                            Stock Restante
                                        </Label>
                                        <div className="col-span-3 flex items-center justify-center mt-3">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                onClick={handleStockDecrement}
                                                disabled={stock <= 0}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <div className="w-20 text-center">
                                                <span className="text-2xl font-bold">{stock}</span>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                onClick={handleStockIncrement}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" onClick={handleSave}>Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </TableCell>
            </TableRow>
        </>
    )
}