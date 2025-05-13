import { createContext, useCallback, useState } from "react";

export const CartContext = createContext({
    cart: [],
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {},
});

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = useCallback(
        (product) => setCart((p) => [...p, product]),
        []
    );

    const removeFromCart = useCallback(
        (productId) => setCart((p) => p.filter(({ _id }) => _id !== productId)),
        []
    );

    const clearCart = useCallback(() => setCart([]), []);

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};
