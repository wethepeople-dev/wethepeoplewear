'use client'

import { Pencil, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog"

import AdminTopBar from "@/components/AdminTopBar";
import { set } from "date-fns";

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
    active: boolean;
    variations: ProductVariation[]; // Include variations
}

export default function Products() {

    const [productsVariation, setProductVariations] = useState<(ProductVariation & { product_name: string })[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [originalProducts, setOriginalProducts] = useState<Product[]>([]); // Backup of the original state
    const [changedProducts, setChangedProducts] = useState<{ product_id: string; active: boolean }[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<(ProductVariation & { product_name: string })[]>([]);
    const [loadedProducts, setLoadedProducts] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [saving, setSaving] = useState(false);


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
                console.log('Products fetched:', products);
                setProducts(products);
                setOriginalProducts(products);
                const activeProducts = products.filter((p) => p.active);

                // Define the custom order for sizes
                const sizeOrder: { [key: string]: number } = { S: 1, M: 2, L: 3, XL: 4 };

                // Transform products to a list of variations with product names
                const variationsWithProductName = activeProducts.flatMap((product) =>
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
                setLoadedProducts(true);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleUpdateProductVariation = (updatedProduct: ProductVariation & { product_name: string }) => {
        const updatedVariations = productsVariation.map((p) =>
            p.variation_id === updatedProduct.variation_id ? updatedProduct : p
        );
        setProductVariations(updatedVariations);
        setFilteredProducts(updatedVariations);
        setSearchValue('');
        toast.success("Producto actualizado", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    };

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

    // Handler function to update product active status
    const handleChange = (productId: string, checked: boolean) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.product_id === productId
                    ? { ...product, active: checked }
                    : product
            )
        );

        // Update changedProducts
        setChangedProducts((prevChanged) => {
            const existingChange = prevChanged.find((change) => change.product_id === productId);

            if (existingChange) {
                // If the product exists and the state is the same as the original, remove it from the changes
                return checked === originalProducts.find((p) => p.product_id === productId)?.active
                    ? prevChanged.filter((change) => change.product_id !== productId)
                    : prevChanged.map((change) =>
                        change.product_id === productId ? { ...change, active: checked } : change
                    );
            }

            // Add the new change if it doesn't exist and state is different
            return checked !== originalProducts.find((p) => p.product_id === productId)?.active
                ? [...prevChanged, { product_id: productId, active: checked }]
                : prevChanged;
        });
    };

    // Handler function to save changes
    const saveChanges = async () => {
        setSaving(true);
        if (changedProducts.length === 0) {
            console.error("No changes to save.");
            return;
        }

        try {
            const response = await fetch('/api/update-products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ changes: changedProducts }), // Send the changedProducts array as "changes"
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Failed to save changes:', errorData.error || 'Unknown error');
                return;
            }

            const result = await response.json();
            console.log('Changes saved successfully:', result);

            // Reset the state after successful save
            setChangedProducts([]);
            setOriginalProducts(products); // Sync original state with the new changes
            setSaving(false);
            setIsOpen(false); // Close the dialog
            window.location.reload();
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };

    // Reset changedProducts when the dialog is closed
    const handleDialogChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) {
            setChangedProducts([]); // Reset changed products
            setProducts(originalProducts); // Reset to the original state
        }
    };

    return (
        <main className="flex min-h-screen flex-col">

            {/* Top Bar */}
            <AdminTopBar title="Products" />

            {/* Dashboard Content */}
            <div className="container mx-auto p-4 lg:p-8">

                {/* top actions */}
                <div className="flex flex-row items-center pb-4">

                    {/* Search input */}
                    <div className="flex flex-row w-full items-center">
                        <Search className="h-6 w-6 mr-3" />
                        <Input
                            placeholder="Busca un producto..."
                            value={searchValue}
                            onChange={(event) => setSearchValue(event.target.value)}
                            className="max-w-sm"
                        />
                    </div>

                    {/* button to deactivate products */}
                    <Button
                        variant={'outline'}
                        className="text-red-500 border-red-500 hover:text-red-500 hover:bg-red-100 ml-4"
                        onClick={() => setIsOpen(true)}
                    >
                        Desactivar <span className="hidden md:block">&nbsp;productos</span>
                    </Button>
                    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Active Products</DialogTitle>
                                <DialogDescription>
                                    {products.length === 0 ?
                                        'No products to show'
                                        :
                                        `${products.filter((p) => p.active).length} active, ${products.length - products.filter((p) => p.active).length} inactive`}
                                </DialogDescription>
                            </DialogHeader>

                            <Table>
                                <ScrollArea className="h-96 border-2 rounded-lg p-2">
                                    <TableBody className="overflow-y-scroll">
                                        {products.map((p) => (
                                            <TableRow key={p.product_id} className="m-0 p-0 hover:bg-transparent">
                                                <TableCell className="font-medium items-center">
                                                    <div className="flex items-center">
                                                        <p>{p.name}</p>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Switch
                                                        id="active"
                                                        checked={p.active}
                                                        onCheckedChange={(checked) => handleChange(p.product_id, checked)}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </ScrollArea>
                            </Table>

                            <DialogFooter>
                                <Button
                                    type="submit"
                                    onClick={saveChanges}
                                    disabled={changedProducts.length === 0 || saving}
                                >
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </DialogFooter>

                        </DialogContent>
                    </Dialog>

                </div>

                {/* Toast notifications */}
                <ToastContainer />

                {
                    !loadedProducts ?

                        <div className="flex-grow flex items-center justify-center h-[60vh]">
                            <div role="status" className="flex flex-col items-center justify-center">
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Cargando...</span>
                            </div>
                        </div>

                        :

                        <Table>
                            {searchValue ?
                                <TableCaption>{filteredProducts.length} resultados para &quot;{searchValue}&quot;</TableCaption>
                                :
                                <TableCaption>{productsVariation.length} variaciones de producto</TableCaption>
                            }

                            {/* Header */}
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Producto</TableHead>
                                    <TableHead>Color</TableHead>
                                    <TableHead className="text-center">Talla</TableHead>
                                    <TableHead className="max-w-[50px] text-center">Stock</TableHead>
                                    <TableHead className="text-center">Precio</TableHead>
                                    <TableHead className="text-center">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>

                            {/* Body */}
                            <TableBody>
                                {filteredProducts.map((p) => (
                                    <ProductVariationAdmin key={p.variation_id} {...p} onUpdateProductVariation={handleUpdateProductVariation} />
                                ))}
                            </TableBody>

                        </Table>

                }

            </div >

        </main >
    );
}
