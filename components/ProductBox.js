import styled from "styled-components";
import Button from "./Button";
import Link from "next/link";
import { CartContext } from "@/context/CartContext";
import { useContext, useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { UserContext } from "@/context/UserContext";
import HeartIcon from "./icons/HeartIcon";
import axios from "axios";

const ProductWrapper = styled.div`
    position: relative;
`;

const WhiteBox = styled(Link)`
    padding: 20px;
    background-color: #fff;
    height: 150px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;  
    img{
        max-width: 100%;
        max-height: 80px;
    }
`;

const Title = styled(Link)`
    font-size: 0.8rem;
    fot-weight: normal;
    margin: 0;
    color: inherit;
    text-decoration: none;
`;

const ProductInfoBox =styled.div`
    margin-top: 5px;
`;

const PriceRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2px;
`;

export const Price = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
`;

const LikeContainer = styled.span`
    position: absolute;
    top: 0;
    right: 0;
    margin: 5px;
    width: 20px;
    cursor: pointer;
`;

const ProductBox = ({_id, title, price, images}) => {
    const url = "/products/"+_id 

    const { data: user } = useCurrentUser()
    const { isLoggedIn } = useContext(UserContext)
    const { addProduct } = useContext(CartContext)
    const [liked, setLiked] = useState(false)

    function addFeaturedToCart() {
        if(!user){
            isLoggedIn()
            return
        }
        addProduct(_id)
    }

    async function toggleLike() {
        setLiked(true)
        let idProd = _id
        let idUser = user._id

        let data = { idProd, idUser };
        await axios.post("/api/like", data)
    }

    return (
        <ProductWrapper>
                <LikeContainer >
                    <HeartIcon liked={liked} onClick={toggleLike} value={_id} />
                </LikeContainer>
            <WhiteBox href={url}>
                <img src={images[0]} /> 
            </WhiteBox>
            <ProductInfoBox>
                <Title href={url}>{title}</Title>
                <PriceRow>
                    <Price>
                        ${price}
                    </Price>
                    <Button onClick={addFeaturedToCart} value={_id} primary={1} >Add to cart</Button>
                </PriceRow>
            </ProductInfoBox>
        </ProductWrapper>
    );
}
 
export default ProductBox;