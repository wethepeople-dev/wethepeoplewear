require('dotenv').config();
const { db } = require('@vercel/postgres');

async function seedData(client) {
    try {
        // Ensure the "uuid-ossp" extension is available for generating UUIDs
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "discount_codes" table if it doesn't exist
        await client.sql`
      CREATE TABLE IF NOT EXISTS discount_codes (
        code_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        code VARCHAR(255) NOT NULL UNIQUE,
        percentage INT NOT NULL,
        active BOOLEAN NOT NULL,
        stripe_validated BOOLEAN NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
        console.log(`Created "discount_codes" table`);

        // Array of sample discount codes
        const discountCodes = [
            // erased for security reasons
        ];

        // Insert discount codes into the table
        //     for (const { code, percentage, active } of discountCodes) {
        //         await client.sql`
        //     INSERT INTO discount_codes (code, percentage, active)
        //     VALUES (${code}, ${percentage}, ${active})
        //     ON CONFLICT (code) DO NOTHING;
        //   `;
        //     }
        //     console.log(`Seeded discount codes`);

        // Create clients table
        await client.sql`
            CREATE TABLE IF NOT EXISTS clients (
                client_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(50) NOT NULL,
                address TEXT NOT NULL,
                city VARCHAR(255) NOT NULL,
                state VARCHAR(50) NOT NULL,
                postal_code VARCHAR(50) NOT NULL,
                country VARCHAR(50) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        console.log("Created 'clients' table");

        // Create orders table
        await client.sql`
            CREATE TABLE IF NOT EXISTS orders (
                order_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                client_id UUID NOT NULL,
                total DECIMAL NOT NULL,
                discount_applied BOOLEAN NOT NULL,
                discount_code_id UUID,
                final_price DECIMAL NOT NULL,
                comments TEXT,
                session_id VARCHAR(255) UNIQUE,
                tracking_id VARCHAR(255) UNIQUE,
                tracking_url VARCHAR(255) UNIQUE,
                shipping_status VARCHAR(50),
                shipping_cost DECIMAL NOT NULL,
                shipping_method VARCHAR(50),
                payment_status VARCHAR(50),
                completed BOOLEAN NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (client_id) REFERENCES clients(client_id),
                FOREIGN KEY (discount_code_id) REFERENCES discount_codes(code_id)
            );
        `;
        console.log("Created 'orders' table");

        // Create the categories table (if not already created)
        await client.sql`
            CREATE TABLE IF NOT EXISTS categories (
                category_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE,
                description TEXT
            );
        `;
        console.log("Created 'categories' table");

        // Create the products table
        await client.sql`
            CREATE TABLE IF NOT EXISTS products (
                product_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                category_id UUID NOT NULL,
                description TEXT NOT NULL,
                colores TEXT[],
                tallas TEXT[],
                release_date DATE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (category_id) REFERENCES categories(category_id)
            );
        `;
        console.log("Created 'products' table");

        // Create the product_variations table
        await client.sql`
            CREATE TABLE IF NOT EXISTS product_variations (
                variation_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                product_id UUID NOT NULL,
                color VARCHAR(50) NOT NULL,
                talla VARCHAR(50) NOT NULL,
                precio DECIMAL NOT NULL,
                fotos TEXT[],
                stock_qty INT NOT NULL, 
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
            );
        `;
        console.log("Created 'product_variations' table");

        // Create order_items table
        await client.sql`
            CREATE TABLE IF NOT EXISTS order_items (
                item_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                order_id UUID NOT NULL,
                product_name VARCHAR(255) NOT NULL,
                product_id UUID NOT NULL,
                variation_id UUID NOT NULL,
                quantity INT NOT NULL,
                FOREIGN KEY (order_id) REFERENCES orders(order_id),
                FOREIGN KEY (product_id) REFERENCES products(product_id),
                FOREIGN KEY (variation_id) REFERENCES product_variations(variation_id)
            );
        `;
        console.log("Created 'order_items' table");

        // Create blog_posts table
        await client.sql`
            CREATE TABLE IF NOT EXISTS blog_posts (
                post_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                thumbnail_url VARCHAR(255),
                summary TEXT,
                tags TEXT[],  -- Array of tags
                author_name VARCHAR(255) NOT NULL,
                author_email VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        console.log("Created 'blog_posts' table");

        // Create tags table for blog post tags
        await client.sql`
            CREATE TABLE IF NOT EXISTS tags (
                tag_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE
            );
        `;
        console.log("Created 'tags' table");

        // Create blog_post_tags table for many-to-many relationship
        await client.sql`
            CREATE TABLE IF NOT EXISTS blog_post_tags (
                post_id UUID NOT NULL,
                tag_id UUID NOT NULL,
                PRIMARY KEY (post_id, tag_id),
                FOREIGN KEY (post_id) REFERENCES blog_posts(post_id) ON DELETE CASCADE,
                FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE
            );
        `;
        console.log("Created 'blog_post_tags' table");

        // Create logs table for tracking user actions
        await client.sql`
            CREATE TABLE IF NOT EXISTS logs (
                log_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                action_type VARCHAR(255) NOT NULL,  -- Type of action ('product_view', 'add_to_cart', 'checkout_initiated', 'purchase_completed', 'blog_post_view')
                entity_id UUID NOT NULL,  -- ID of the relevant entity (e.g., product_id for product views, blog_post_id for blog views)
                product_size VARCHAR(255),  -- Optional: For logging product sizes (useful for 'add_to_cart' and 'purchase_completed')
                product_color VARCHAR(255),  -- Optional: For logging product colors (useful for 'add_to_cart' and 'purchase_completed')
                quantity INT,  -- Optional: For tracking the quantity of products (useful for 'purchase_completed')
                total_amount DECIMAL(10, 2),  -- Optional: For tracking total spent (applies to 'purchase_completed')
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Log the time of the action
            );
        `;
        console.log("Created 'logs' table");

    } catch (error) {
        console.error('Error seeding discount codes:', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();

    try {
        await seedData(client);
    } finally {
        await client.end();
    }
}

main().catch((err) => {
    console.error('An error occurred while attempting to seed the database:', err);
});
