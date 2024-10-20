// scripts/migrateProducts.js
require('dotenv').config();
const { db } = require('@vercel/postgres');
const productos = require('../app/data/productos.js'); // Adjust path if necessary

async function migrateProducts() {
    const client = await db.connect();
    try {
        // Insert products into the products table
        for (const producto of productos) {
            const { nombre, categoriaId, descripcion, colores, releaseDate, fotos } = producto;

            // Insert product
            const result = await client.sql`
                INSERT INTO products (name, category_id, description, colores, release_date)
                VALUES (${nombre}, ${categoriaId}, ${descripcion}, ${colores}, ${releaseDate})
                RETURNING product_id;
            `;
            const productId = result.rows[0].product_id;

            // Insert product variations
            for (const variacion of producto.variaciones) {
                const { color, precio, tallas } = variacion;

                const tallasDeCamisas = ["S", "M", "L", "XL"];

                for (const tallaa of tallasDeCamisas) {
                    await client.sql`
                        INSERT INTO product_variations (product_id, color, talla, precio, fotos, stock_qty)
                        VALUES (
                            ${productId}, 
                            ${color}, 
                            ${tallaa},
                            ${precio}, 
                            ${Object.entries(fotos).find(([key]) => key === color)[1]},
                            0
                        );
                    `;
                }

            }
        }
        console.log("Products and variations migrated successfully.");
    } catch (error) {
        console.error("Error migrating products:", error);
    } finally {
        await client.end();
    }
}

migrateProducts();
