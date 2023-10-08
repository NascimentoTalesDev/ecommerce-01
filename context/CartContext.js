import { createContext, useState } from "react";

export const CartContext = createContext({})

const CartContextProvider = ({children}) => {
    const [cartProducts, setCartProducts] = useState([])
    
    function addProduct(productId) {
        setCartProducts(prev => [...prev, productId])
    }
    return (
        <CartContext.Provider value={{cartProducts, setCartProducts, addProduct}}>
            {children}
        </CartContext.Provider>
    );
}
 
export default CartContextProvider;