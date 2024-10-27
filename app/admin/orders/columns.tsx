"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown, User, Mail, Phone, MapPin } from "lucide-react"
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

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

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
        accessorKey: "name",
        header: "Cliente",
        cell: ({ row }) => {
            const order = row.original; // Access the original row data

            return (
                <Popover>
                    <PopoverTrigger>
                        <div className="text-blue-800 underline hover:text-gray-600">{order.name}</div>
                    </PopoverTrigger>
                    <PopoverContent className="w-full gap-2 grid">
                        <div className="flex items-center space-x-4">
                            <User className="h-5 w-5 text-gray-500" />
                            <div className="font-normal">{order.name}</div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Mail className="h-5 w-5 text-gray-500" />
                            <div className="overflow-hidden">{order.email}</div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Phone className="h-5 w-5 text-gray-500" />
                            <div>{order.phone}</div>
                        </div>
                        {order.address && (
                            <div className="grid gap-2">
                                <div className="font-normal flex space-x-2">
                                    <MapPin className="h-5 w-5 text-gray-500" />
                                    <div className="pl-2 grid gap-1">
                                        <div>{order.address}, {order.municipio} {order.postal_code}</div>
                                        <div>{order.city}, {order.state}, {order.country}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </PopoverContent>
                </Popover>
            )
        }
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

                        <DropdownMenuItem>
                            <Link href={`/admin/orders/${order.order_id}`} className="w-full">
                                Ver Detalle
                            </Link>
                        </DropdownMenuItem>

                        {order.tracking_url && (
                            <DropdownMenuItem className="hover:cursor-pointer">
                                <Link href={`${order.tracking_url}`} target="blank" className="w-full">
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
