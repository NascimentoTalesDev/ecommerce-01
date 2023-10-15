import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import Cart from "./icons/Cart";
import ButtonLink from "./ButtonLink";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import Auth from "@/pages/auth";
import { CartContext } from "@/context/CartContext";
import useCurrentUser from "@/hooks/useCurrentUser";

const Bg = styled.div`
    background-color: #222;
    color: #fff;
    padding: 50px 0;
`;

const Title = styled.h1`
    margin: 0;
    font-weight: normal;
    font-size: 3rem;
`;

const Desc = styled.p`
    color: #aaa;
    font-size: 0.8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  img{
    max-width: 100%;
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

const Featured = ({product}) => {
    const { isLoggedIn, modalUser} = useContext(UserContext)
    const {data: user} = useCurrentUser() 
    const { addProduct } = useContext(CartContext)
    
    function addFeaturedToCart() {
        if(!user){
            isLoggedIn()
        }
        addProduct(product._id)
    }

    return (
        <Bg>
            {user?.name}
            {modalUser && (
                <Auth />
            )}
            <Center>
                <ColumnsWrapper>
                    <Column>
                        <div>
                            <Title>{product?.title}</Title>
                            <Desc>{product?.description}</Desc>
                            <ButtonsWrapper>
                                <ButtonLink href={"/products/"+product._id} white={1} outline={1} size="l">Read more </ButtonLink>
                                <Button onClick={addFeaturedToCart} value={product?._id}  white={1} size="l"><Cart width='16px'/> Add to cart</Button>
                            </ButtonsWrapper>
                        </div>
                    </Column>
                    <Column>
                        <img src={product?.images[0]}></img>
                    </Column>
                </ColumnsWrapper>
            </Center>
        </Bg>
    );
}

export default Featured;