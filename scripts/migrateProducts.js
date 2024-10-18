const { db } = require('@vercel/postgres');
const { productos } = require('../app/data/productos');

async function migrateProducts() {
    const client = await db.connect();
    try {
        for (const producto of productos) {
            // First, find the category_id from the category name
            const { rows: category } = await client.sql`
                SELECT category_id FROM categories WHERE name = ${producto.categoriaNombre};
            `;
            const categoryId = category[0]?.category_id;

            // Insert the product
            const { rows: product } = await client.sql`
                INSERT INTO products (product_id, name, category_id, description, colores, release_date)
                VALUES (uuid_generate_v4(), ${producto.nombre}, ${categoryId}, ${producto.descripcion}, ${producto.colores}, ${producto.releaseDate})
                RETURNING product_id;
            `;
            const productId = product[0].product_id;

            // Insert the product variations
            for (const variacion of producto.variaciones) {
                await client.sql`
                    INSERT INTO product_variations (variation_id, product_id, color, precio, tallas, fotos)
                    VALUES (uuid_generate_v4(), ${productId}, ${variacion.color}, ${variacion.precio}, ${variacion.tallas}, ${producto.fotos[variacion.color]});
                `;
            }
        }
        console.log("Products migrated successfully.");
    } catch (error) {
        console.error("Error migrating products:", error);
    } finally {
        await client.end();
    }
}

migrateProducts();
