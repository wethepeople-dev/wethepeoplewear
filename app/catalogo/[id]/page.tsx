
import { Metadata } from 'next';
import SingleProductContent from './SingleProductContent';

export async function generateMetadata({ params }: { params: { id: string } }) {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/products/${params.id}`, {
            method: 'GET',
        });

        if (response.ok) {
            const product = await response.json();
            console.log('PRODUCT', product);
            return {
                title: `${product.name} Graphic T-Shirt`,
                description: `${product.description ? product.description : 'Graphic T-Shirt | We The People Wear'}`,
                openGraph: {
                    title: `${product.name} Graphic T-Shirt`,
                    description: `${product.description ? product.description : 'Graphic T-Shirt | We The People Wear'}`,
                    type: "website",
                    locale: "es_ES",
                    url: `${process.env.NEXT_PUBLIC_HOST}/catalogo/${params.id}`,
                    siteName: "We The People Wear",
                    images: [
                        {
                            url: `${product.variations[0].fotos[0]}`,
                            width: 800,
                            height: 600,
                            alt: `${product.name} Graphic T-Shirt`,
                        }
                    ]
                },
            };
        }
    } catch (error) {
        console.error('ERROR ON METADATA', error);
        return {
            title: `Graphic T-Shirt`,
            // description: `This is a description for the ${params.id} Graphic T-Shirt.`,
            openGraph: {
                title: `${params.id} Graphic T-Shirt`,
                description: `This is a description for the ${params.id} Graphic T-Shirt.`,
                type: "website",
                locale: "es_ES",
                url: `${process.env.NEXT_PUBLIC_HOST}/catalogo/${params.id}`,
                siteName: "We The People Wear",
            },
        };
    }
}

export default function SingleProduct({ params }: { params: { id: string } }) {
    return <SingleProductContent id={params.id} />;
};
