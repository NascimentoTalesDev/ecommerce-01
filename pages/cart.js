import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
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

export const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
    position: relative;
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
`;

export const CityHolder = styled.div`
    display: flex;
    gap: 5px;
`;

export default function CartPage() {
    const { cartProducts, clearCart, addProduct, removeProduct } = useContext(CartContext)
    const [products, setProducts] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [country, setCountry] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)

    useEffect(() => {
        if (cartProducts.length > 0) {
            axios.post("/api/cart", { ids: cartProducts })
                .then(response => {
                    setProducts(response.data);
                })
        }else{
            setProducts([])
        }
    }, [cartProducts])

    useEffect(() => {
        if (typeof window === 'undefined') {
          return;
        }
        if (window?.location.href.includes('cart?success=1')) {
            setIsSuccess(true);
            setTimeout(() => {
                
                clearCart();
            }, 10);
        }
      }, []);

    function moreOfThisProduct(id) {
        addProduct(id)
    }

    function lessOfThisProduct(id) {
        removeProduct(id)
    }

    async function goToPayment() {
        const response = await axios.post("/api/checkout", {
            name, email, city, postalCode, streetAddress, country, cartProducts
        })
        
        if (response.data.url) {
            window.location = response.data.url;

        }
    }

    let total = 0;
    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        total += price;
    }

    if (isSuccess) {

        return(
            <>
                <Header />
                <Center>
                    <ColumnsWrapper>
                        <Box>
                            <h1>Thanks for your order!</h1>
                            <p>We will email you when your order will be sent.</p>
                        </Box>
                    </ColumnsWrapper>
                </Center>
            </>
        );
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
                            <Input type="text" placeholder="Name"  value={name} name="name" onChange={(ev) => setName(ev.target.value)} />
                            <Input type="text" placeholder="Email" value={email} name="email" onChange={(ev) => setEmail(ev.target.value)} />
                            <CityHolder>
                                <Input type="text" placeholder="City" value={city} name="city" onChange={(ev) => setCity(ev.target.value)}/>
                                <Input type="text" placeholder="Postal Code" value={postalCode} name="postalCode" onChange={(ev) => setPostalCode(ev.target.value)}/>
                            </CityHolder>
                            <Input type="text" placeholder="Street Address" value={streetAddress} name="streetAddress" onChange={(ev) => setStreetAddress(ev.target.value)}/>
                            <Input type="text" placeholder="Country" value={country} name="country" onChange={(ev) => setCountry(ev.target.value)}/>
                            <Button onClick={goToPayment} block={1} black={1} type="submit">Continue to payment</Button>
                        </Box>
                    )}
                </ColumnsWrapper>
            </Center>
        </>
    )
}
