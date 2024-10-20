require('dotenv').config();
const { db } = require('@vercel/postgres');
const categorias = require('../app/data/categorias');

async function migrateCategories() {
    const client = await db.connect();
    try {
        for (const categoria of categorias) {
            await client.sql`
                INSERT INTO categories (category_id, name, description)
                VALUES (uuid_generate_v4(), ${categoria.nombre}, ${categoria.descripcion})
                ON CONFLICT (name) DO NOTHING;
            `;
        }
        console.log("Categories migrated successfully.");
    } catch (error) {
        console.error("Error migrating categories:", error);
    } finally {
        await client.end();
    }
}

migrateCategories();
