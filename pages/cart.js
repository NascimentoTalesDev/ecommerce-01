import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Table from "@/components/Table";
import { CartContext } from "@/context/CartContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.2fr .8fr;
    gap: 40px;
    margin-top: 40px;
`;

const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
`;


export default function CartPage() {
    const { cartProducts } = useContext(CartContext)
    const [products, setProducts] = useState([])
    
    useEffect(() => {
        if (cartProducts.length > 0) {
            axios.post("/api/cart", {ids:cartProducts})
            .then(response => {
                setProducts(response.data);
            })
        }
    },[cartProducts])

    return (
        <>
            <Header />
            <Center>
                <ColumnsWrapper>
                    <Box>
                        <h2>Cart</h2>
                        {!products?.length && (
                            <div>Your cart is empty!</div>
                        )}

                        {products?.length > 0 && (
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Product</th>                                       
                                        <th>Quantity</th>                                       
                                        <th>Price</th>                                       
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr>
                                            <td>{product.title}</td>                                       
                                            <td>{cartProducts.filter(id => id === product._id).length}</td>                                       
                                            <td>{product.price}</td>                                              
                                        </tr>
                                    ))}
                                </tbody> 
                            </Table>
                        )}
                    </Box>
                        {!!products?.length > 0 && (
                            <Box>
                                <h2>Order Information</h2>
                                <input type="text" placeholder="Address"></input>
                                <input type="text" placeholder="Address 2"></input>
                                <Button block={1} black={1}>Continue to payment</Button>
                            </Box>                        
                        )}
                </ColumnsWrapper>
            </Center>
        </>
    )
}
