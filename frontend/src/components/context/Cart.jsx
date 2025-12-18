import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartData, setCartData] = useState([JSON.parse(localStorage.getItem('cart')) || []]);

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


    return (
        <CartContext.Provider value={({ addToCart, cartData, grandTotal, subTotal, shipping })}>
            {children}
        </CartContext.Provider>
    )
}
