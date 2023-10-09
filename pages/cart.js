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

const ProductInfoCell = styled.td`
    padding-top: 10px;
    `;

const ProductImageBox = styled.div`
    width: 100px;
    height: 100px;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(0,0,0,0.1);

    img{
        max-width: 80px;
        max-height: 80px;
    }
`;

const QuantityLabel = styled.span`
    padding: 0 3px;
`;

const QuantityProduct = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export default function CartPage() {
    const { cartProducts, addProduct, removeProduct } = useContext(CartContext)
    const [products, setProducts] = useState([])

    useEffect(() => {
        if (cartProducts.length > 0) {
            axios.post("/api/cart", { ids: cartProducts })
                .then(response => {
                    setProducts(response.data);
                })
        }
    }, [cartProducts])

    function moreOfThisProduct(id) {
        addProduct(id)
    }

    function lessOfThisProduct(id) {
        removeProduct(id)
    }

    let total = 0;
    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        total += price;
    }
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
                                            <ProductInfoCell>
                                                <ProductImageBox>
                                                    <img src={product.images[0]} />
                                                </ProductImageBox>
                                                {product.title}
                                            </ProductInfoCell>
                                            <td>
                                                <QuantityProduct>
                                                    <Button onClick={() => lessOfThisProduct(product._id)}>-</Button>
                                                    <QuantityLabel>
                                                        {cartProducts.filter(id => id === product._id).length}
                                                    </QuantityLabel>
                                                    <Button onClick={() => moreOfThisProduct(product._id)}>+</Button>
                                                </QuantityProduct>
                                            </td>
                                            <td>
                                                {cartProducts.filter(id => id === product._id).length * product.price}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>{total}</td>
                                    </tr>
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