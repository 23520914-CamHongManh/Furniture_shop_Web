import { createContext, useState } from "react";
import { set } from "react-hook-form";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartData, setCartData] = useState(JSON.parse(localStorage.getItem('cart')) || []);

    const addToCart = (product) => {
        let updatedCart = [...cartData];

        //If cart is empty
        if (cartData.length == 0) {
            updatedCart.push({
                id: `${product.id}-${Math.floor(Math.random() * 10000000)}`,
                product_id: product.id,
                title: product.title,
                price: product.price,
                qty: 1,
                image_url: product.image_url
            })
        } else {
            //If cart has some items
            const isProductExist = updatedCart.find(item =>
                item.product_id === product.id
            )
            //If product already exist in cart, increase the quantity
            if (isProductExist) {
                updatedCart = updatedCart.map(item =>
                    (item.product_id == product.id)
                        ? { ...item, qty: item.qty + 1 }
                        : item
                )
            } else {
                //If product does not exist in cart, add new item
                updatedCart.push({
                    id: `${product.id}-${Math.floor(Math.random() * 10000000)}`,
                    product_id: product.id,
                    title: product.title,
                    price: product.price,
                    qty: 1,
                    image_url: product.image_url
                })
            }
        }

        setCartData(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    const shipping = () => {
        return 0;
    }

    const subTotal = () => {
        let subtotal = 0;
        cartData.map(item => {
            subtotal += item.price * item.qty;
        })
        return subtotal;
    }

    const grandTotal = () => {
        return subTotal() + shipping();
    }

    const updateCartItem = (itemId, newQty) => {
        let updatedCart = { ...cartData };
        updatedCart = updatedCart.map(item =>
            (item.id == itemId)
                ? { ...item, qty: newQty }
                : item
        )
        setCartData(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    const deleteCartItem = (itemId) => {
        const newCartData = cartData.filter(item => item.id !== itemId)
        setCartData(newCartData);
        localStorage.setItem('cart', JSON.stringify(newCartData));
    }

    const getQty = () => {
        let qty = 0;
        cartData.map(item => {
            qty += parseInt(item.qty)
        });
        return qty;
    }

    return (
        <CartContext.Provider value={({ addToCart, cartData, grandTotal, subTotal, shipping, updateCartItem, deleteCartItem, getQty })}>
            {children}
        </CartContext.Provider>
    )
}
