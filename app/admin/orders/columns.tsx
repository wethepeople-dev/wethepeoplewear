"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

interface ProductVariation {
    variation_id: string;
    product_id: string;
    color: string;
    talla: string;
    precio: number;
    fotos: string[];
    stock_qty: number;
}

interface Product {
    product_id: string;
    name: string;
    description: string;
    category_id: string;
    colores: string[];
    tallas: string[];
    release_date: string;
    variations: ProductVariation[];
}

type Client = {
    client_id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    municipio: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    created_at: string;
};

type Order = {
    order_id: string;
    client_id: string;
    final_price: number;
    discount_applied: boolean;
    discount_code_id: string | null;
    comments: string | null;
    completed: boolean;
    total: number;
    session_id: string;
    tracking_id: string | null;
    tracking_url: string | null;
    shipping_status: string | null;
    shipping_cost: number;
    shipping_method: string | null;
    payment_status: string | null;
    created_at: string;
    updated_at: string;
};

type OrderItem = {
    item_id: string;
    order_id: string;
    product_name: string;
    product_id: string;
    variation_id: string;
    quantity: number;
};

type OrderResponse = {
    order: Order;
    client: Client;
    items: OrderItem[];
};

interface DiscountCode {
    code_id: string;
    code: string;
    percentage: number;
    active: boolean;
    stripe_validated: boolean;
    created_at: string;
}

export type OrderData = {
    order_id: string;
    created_at: string;
    product_quantity: number;
    final_price: number;
    shipping_status: string;
    shipping_method: string;
    completed: boolean;
};

export const columns: ColumnDef<OrderData>[] = [
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
    },
    {
        accessorKey: "shipping_status",
        header: "Estado de envío",
    },
    {
        accessorKey: "shipping_method",
        header: "Método de envío",
    },
    {
        accessorKey: "completed",
        header: "Completada",
        cell: ({ row }) => {
            const completed = row.getValue("completed")

            return (
                <div className="flex items-center justify-center">
                    {completed ? (
                        <span className="sr-only">Completada</span>
                    ) : (
                        <span className="sr-only">No completada</span>
                    )}
                    <div
                        className={`h-3 w-3 rounded-full ${completed ? "bg-green-500" : "bg-gray-300"
                            }`}
                    />
                </div>
            )
        }
    },
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
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.order_id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
