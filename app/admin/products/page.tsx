'use client'

import { cn } from "@/lib/utils"
import { Search, Menu, Settings, ShoppingCart, Users, Pencil } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import ProductVariationAdmin from "./ProductVariationAdmin"

import { formatCurrency } from "@/lib/utils"

interface ProductVariation {
    variation_id: string; // UUID
    product_id: string; // UUID
    color: string;
    talla: string;
    precio: number;
    fotos: string[]; // Adjust based on your structure
    stock_qty: number;
}

interface Product {
    product_id: string; // UUID
    name: string;
    description: string;
    colores: string[];
    tallas: string[];
    release_date: string; // or Date
    variations: ProductVariation[]; // Include variations
}

import { useSidebar } from "@/lib/AdminSidebarContext"

export default function Products() {

    const [productsVariation, setProductVariations] = useState<(ProductVariation & { product_name: string })[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<(ProductVariation & { product_name: string })[]>([]);

    const handleUpdateProductVariation = (updatedProduct: ProductVariation & { product_name: string }) => {
        const updatedVariations = productsVariation.map((p) =>
            p.variation_id === updatedProduct.variation_id ? updatedProduct : p
        );
        setProductVariations(updatedVariations);
    }


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products', {
                    cache: 'no-store', // Ensure no caching
                });
                if (!response.ok) {
                    console.error('Failed to fetch products');
                    return;
                }

                const products: Product[] = await response.json();

                // Define the custom order for sizes
                const sizeOrder: { [key: string]: number } = { S: 1, M: 2, L: 3, XL: 4 };

                // Transform products to a list of variations with product names
                const variationsWithProductName = products.flatMap((product) =>
                    product.variations.map((variation) => ({
                        ...variation,
                        product_name: product.name, // Include product name
                    }))
                );

                // Sort variations by product_id, then by color, and then by talla (size) using sizeOrder
                const sortedVariations = variationsWithProductName.sort((a, b) => {
                    if (a.product_id < b.product_id) return -1;
                    if (a.product_id > b.product_id) return 1;
                    if (a.color < b.color) return -1;
                    if (a.color > b.color) return 1;
                    return (sizeOrder[a.talla] || 0) - (sizeOrder[b.talla] || 0);
                });

                console.log(sortedVariations.length, 'products fetched and sorted');

                setProductVariations(sortedVariations);
                setFilteredProducts(sortedVariations);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);



    // Filter products based on searchValue
    useEffect(() => {
        if (searchValue == '') {
            setFilteredProducts(productsVariation);
            return;
        }
        setFilteredProducts(
            productsVariation.filter((p) =>
                p.product_name.toLowerCase().includes(searchValue.toLowerCase())
            )
        );
    }, [searchValue]);

    const { toggleSidebar } = useSidebar();

    return (
        <main className="flex min-h-screen flex-col">

            {/* Top Bar */}
            <header className="flex h-16 items-center justify-between border-b bg-white px-4 lg:px-6">
                <Button
                    variant="ghost"
                    className="lg:hidden"
                    onClick={toggleSidebar}
                >
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Sidebar</span>
                </Button>
                <h1 className="text-2xl font-semibold">Products</h1>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="h-8 w-8 rounded-full hover:cursor-pointer">
                            <img
                                src="/logos/icon.png"
                                alt="User"
                                className="rounded-full hover:opacity-75"
                            />
                            <span className="sr-only">Toggle user menu</span>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>

            {/* Dashboard Content */}
            <div className="container mx-auto p-4 lg:p-8">

                {/* search input */}
                <div className="flex flex-row items-center py-4">
                    <div className="flex flex-row w-full items-center">
                        <Search className="h-6 w-6 mr-3" />
                        <Input
                            placeholder="Busca un producto..."
                            value={searchValue}
                            onChange={(event) => setSearchValue(event.target.value)}
                            className="max-w-sm"
                        />
                    </div>
                </div>

                {/* Products */}
                <Table>
                    {searchValue ?
                        <TableCaption>{filteredProducts.length} resultados para "{searchValue}"</TableCaption>
                        :
                        <TableCaption>{productsVariation.length} variaciones de producto</TableCaption>
                    }

                    {/* Header */}
                    <TableHeader>
                        <TableRow>
                            <TableHead>Producto</TableHead>
                            <TableHead>Color</TableHead>
                            <TableHead className="text-center">Talla</TableHead>
                            <TableHead className="w-[100px] text-center">Stock</TableHead>
                            <TableHead className="text-center">Precio</TableHead>
                            <TableHead className="text-center">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>

                    {/* Body */}
                    <TableBody>
                        {filteredProducts.map((p) => (
                            <ProductVariationAdmin key={p.variation_id} {...p} />
                        ))}
                    </TableBody>


                    {/* <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">$2,500.00</TableCell>
                        </TableRow>
                    </TableFooter> */}

                </Table>

            </div>

        </main>
    );
}
