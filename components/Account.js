import { signOut } from 'next-auth/react';
import { Box, CityHolder } from "@/pages/cart";
import Center from "./Center";
import styled from "styled-components";
import Input from "./Input";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/context/CartContext";
import axios from "axios";
import { useRouter } from 'next/router';
import useCurrentUser from '@/hooks/useCurrentUser';
import Button from './Button';
import { internalMutate } from 'swr/_internal';

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
const ButtonsContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 0px;
`;
const ButtonList = styled.button`
    border: none;
    background-color: transparent;
    border-bottom: 1px solid transparent;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    ${props => props.active ? 
        `
        border-color: black;
        transition: scale(1.8);
        ` 
        :
        `
        border-color: black;
        opacity: 0.8;
    `}
    
`;

const Account = () => {
    const { cartProducts } = useContext(CartContext)
    const {data: user} = useCurrentUser() 
    const router = useRouter()
    const [active, setActive] = useState(false)
    const [order, setOrder] = useState(false)
    const [orderList, setOrderList] = useState(false)
    const [wish, setWish] = useState(false)
    const [wishList, setWishList] = useState(false)
    
    function logout() {
        signOut()
    }
    useEffect(() => {
        console.log(user.wishlist[0]);
    }, [])

    return (
        <>
            <Center>
                <ColumnsWrapper>
                    <Box>
                        <ButtonsContainer>
                            <ButtonList onClick={() => {setOrder(true); setWish(false)}} active={order} >Order</ButtonList>
                            <ButtonList onClick={() => {setWish(true); setOrder(false)}} active={wish} >WishList</ButtonList>
                        </ButtonsContainer>
                        {wish ? (
                        `
                        
                        
                        `)
                        : 
                        (`
                        
                        
                        `)}

                    </Box>
                    <Box>
                        <h2>Account details</h2>
                            <Input type="text" value={user?.name} placeholder="Name"  name="name" onChange={(ev) => {}} />
                            <Input type="text" value={user?.email} placeholder="Email" name="email" onChange={(ev) => {}} />
                            <CityHolder>
                                <Input type="text" placeholder="City" name="city" onChange={(ev) => {}}/>
                                <Input type="text" placeholder="Postal Code" name="postalCode" onChange={(ev) => {}}/>
                            </CityHolder>
                            <Input type="text" placeholder="Street Address" name="streetAddress" onChange={(ev) => {}}/>
                            <Input type="text" placeholder="Country" name="country" onChange={(ev) => {}}/>
                            <Button paddingY={1} block={1} black={1} type="submit">Save</Button>                      
                            <Logout>
                                <Button onClick={logout} paddingY={1} primary={1} outline={1} type="submit">Logout</Button>                      
                            </Logout>
                    </Box>
                </ColumnsWrapper>
            </Center>
        </>
    );
}
 
export default Account;