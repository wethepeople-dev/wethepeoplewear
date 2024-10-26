"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useState } from 'react'
import ActualizarOrden from "./ActualizarOrden"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const formatDate = (dateString: string) => {
    const date = new Date(dateString) // Parse the date from the string
    const formatter = new Intl.DateTimeFormat('es-MX', {
        timeZone: 'America/Monterrey',
        dateStyle: "short",
        timeStyle: "short"
        // second: 'numeric',
    })
    return formatter.format(date)
}

function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

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
};

export const columns = (handleOrderUpdate: (order: OrderData) => void): ColumnDef<OrderData>[] => [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    // {
    //     accessorKey: "created_at",
    //     header: "Creada el",
    // },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Creada el
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date: string = row.getValue("created_at")
            return <div>{formatDate(date)}</div>
        },
    },
    {
        accessorKey: "shipping_status",
        header: "Estatus de envío",
        cell: ({ row }) => {
            return (
                <Badge className={`${row.getValue("shipping_status") == 'processing' ? 'bg-gray-400' : row.getValue("shipping_status") == 'delivered' ? 'bg-yellow-500' : row.getValue("shipping_status") == 'completed' ? 'bg-green-500' : 'text-black'}`}>
                    {(row.getValue("shipping_status") as string).toUpperCase()}
                </Badge>
            )
        }
    },
    {
        accessorKey: "shipping_method",
        header: "Método de envío",
        cell: ({ row }) => {
            return (
                <div>{(capitalizeFirstLetter(row.getValue("shipping_method") as string))}</div>
            )
        }
    },
    // {
    //     accessorKey: "completed",
    //     header: ({ column }) => {
    //         return (
    //             <div className="text-center">
    //                 Completada
    //             </div>
    //         )
    //     },
    //     cell: ({ row }) => {
    //         const completed = row.getValue("completed")

    //         return (
    //             <div className="items-center text-center justify-center">
    //                 <div
    //                     className={`h-3 w-3 text-center mx-auto rounded-full ${completed ? "bg-green-500" : "bg-gray-300"}`}
    //                 />
    //             </div>
    //         )
    //     }
    // },
    {
        accessorKey: "product_quantity",
        header: "Cantidad",
    },
    {
        accessorKey: "final_price",
        header: () => <div className="">Precio Final</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("final_price"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className=" font-medium">{formatted}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const order = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">

                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        {/* <DropdownMenuItem onClick={() => navigator.clipboard.writeText(order.order_id)}>
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator /> */}

                        <DropdownMenuItem onClick={() => console.log('ver cliente')} className="hover:cursor-pointer">
                            Ver cliente
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            <Link href={`/admin/orders/${order.order_id}`}>
                                Ver Detalle
                            </Link>
                        </DropdownMenuItem>

                        {order.tracking_url && (
                            <DropdownMenuItem className="hover:cursor-pointer">
                                <Link href={`${order.tracking_url}`} target="blank">
                                    Ver seguimiento
                                </Link>
                            </DropdownMenuItem>
                        )}

                        <ActualizarOrden {...order} onUpdateOrder={handleOrderUpdate} />

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
