// lib/CartContext.tsx
'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Variacion {
    color: string;
    talla: string;
    precio: number;
    variation_id: string;
}

export interface CartItem {
    productId: string;
    nombre: string;
    cantidad: number;
    foto: string;
    variacion: Variacion;
}

interface CartContextType {
    // cart
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    getCartQuantity: () => number;
    getCart: () => CartItem[];
    emptyCart: () => void;
    editCartItem: (productId: string, talla: string, color: string, changes: Partial<CartItem>) => void;
    removeCartItem: (productId: string, talla: string, color: string) => void;
    getTotal: () => number;
    // product views
    productViews: string[];  // Track viewed products
    hasViewedProduct: (productId: string) => boolean;
    addProductView: (productId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [productViews, setProductViews] = useState<string[]>([]);

    useEffect(() => {
        const loadedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const loadedProductViews = JSON.parse(localStorage.getItem('productViews') || '[]');
        setCart(loadedCart);
        setProductViews(loadedProductViews);
    }, []);

    const addToCart = (item: CartItem) => {
        const updatedCart = [...cart];
        const existingItemIndex = updatedCart.findIndex(i =>
            i.productId === item.productId &&
            i.variacion.talla === item.variacion.talla &&
            i.variacion.color === item.variacion.color
        );
        if (existingItemIndex > -1) {
            updatedCart[existingItemIndex].cantidad += item.cantidad;
        } else {
            updatedCart.push(item);
        }
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const getCartQuantity = () => {
        return cart.reduce((acc, item) => acc + item.cantidad, 0);
    };

    const getCart = () => {
        return cart;
    };

    const emptyCart = () => {
        setCart([]);
        localStorage.setItem('cart', JSON.stringify([]));
    };

    const editCartItem = (productId: string, talla: string, color: string, changes: Partial<CartItem>) => {
        let updatedCart = [...cart];
        const itemIndex = updatedCart.findIndex(i =>
            i.productId === productId &&
            i.variacion.talla === talla &&
            i.variacion.color === color
        );
        if (itemIndex > -1) {
            updatedCart[itemIndex] = { ...updatedCart[itemIndex], ...changes };
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };

    const removeCartItem = (productId: string, talla: string, color: string) => {
        let updatedCart = cart.filter(i => !(i.productId === productId && i.variacion.talla === talla && i.variacion.color === color));
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const getTotal = () => {
        return cart.reduce((acc, item) => acc + item.cantidad * item.variacion.precio, 0);
    }

    const hasViewedProduct = (productId: string) => {
        return productViews.includes(productId);
    };

    const addProductView = (productId: string) => {
        if (!hasViewedProduct(productId)) {
            const updatedProductViews = [...productViews, productId];
            setProductViews(updatedProductViews);
            localStorage.setItem('productViews', JSON.stringify(updatedProductViews));
        }
    };

    return (
        <CartContext.Provider value={{
            cart, addToCart, getCartQuantity, getCart, emptyCart, editCartItem,
            removeCartItem, getTotal, productViews, hasViewedProduct, addProductView
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
