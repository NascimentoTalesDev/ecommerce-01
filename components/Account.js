import { Box, CityHolder } from "@/pages/cart";
import Center from "./Center";
import styled from "styled-components";
import Input from "./Input";
import Button from "./Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/context/CartContext";
import axios from "axios";

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.3fr .7fr;
    gap: 40px;
    margin-top: 40px;
`;

const Logout = styled.div`
    border-top: 1px solid #ccc;
    margin-top: 10px;
    padding-top: 10px;
`;

const Account = () => {
    const { cartProducts } = useContext(CartContext)
    const [products, setProducts] = useState([])

    useEffect(() => {
        if (cartProducts.length > 0) {
            axios.post("/api/cart", { ids: cartProducts })
                .then(response => {
                    setProducts(response.data);
                })
        }
    }, [])

    return (
        <>
            <Center>
                <ColumnsWrapper>
                    <Box>
                        Order
                        {!products?.length && (
                            <div>Your cart is empty!</div>
                        )}
                        {products.length > 0 && products.map(product => (
                            <div>{product?.title}</div> 
                        ))}
                    </Box>
                    <Box>
                        <h2>Account details</h2>
                            <Input type="text" placeholder="Name"  name="name" onChange={(ev) => {}} />
                            <Input type="text" placeholder="Email" name="email" onChange={(ev) => {}} />
                            <CityHolder>
                                <Input type="text" placeholder="City" name="city" onChange={(ev) => {}}/>
                                <Input type="text" placeholder="Postal Code" name="postalCode" onChange={(ev) => {}}/>
                            </CityHolder>
                            <Input type="text" placeholder="Street Address" name="streetAddress" onChange={(ev) => {}}/>
                            <Input type="text" placeholder="Country" name="country" onChange={(ev) => {}}/>
                            <Button paddingY={1} block={1} black={1} type="submit">Save</Button>                      
                            <Logout>
                                <Button paddingY={1} primary={1} outline={1} type="submit">Logout</Button>                      
                            </Logout>
                    </Box>
                </ColumnsWrapper>
            </Center>
        </>
    );
}
 
export default Account;