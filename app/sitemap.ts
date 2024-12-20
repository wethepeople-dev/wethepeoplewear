import { MetadataRoute } from "next";

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
    category_id: string;
    tallas: string[];
    release_date: string; // or Date
    active: boolean;
    variations: ProductVariation[]; // Include variations
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    async function getProducts() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/products`, {
                method: 'GET',
            });

            if (response.ok) {
                const prods = await response.json();
                return prods.map((p: Product) => {
                    return {
                        url: `${process.env.NEXT_PUBLIC_HOST}/catalogo/${p.product_id}`,
                        lastModified: new Date(),
                    }
                });
            }
        } catch (error) {
            console.error('ERROR ON METADATA', error);
        }
    }
    const productUrls: { url: string, lastModified: any }[] = await getProducts() || [];


    return [
        {
            url: `${process.env.NEXT_PUBLIC_HOST}`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXT_PUBLIC_HOST}/catalogo`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXT_PUBLIC_HOST}/contacto`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXT_PUBLIC_HOST}/conocenos`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXT_PUBLIC_HOST}/carrito`,
            lastModified: new Date(),
        },
        ...productUrls,
    ]
}