import styled from "styled-components";
import Button from "./Button";
import Link from "next/link";
import { CartContext } from "@/context/CartContext";
import { useContext } from "react";

const ProductWrapper = styled.div`

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

const Price = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
`;

const ProductBox = ({_id, title, price, description, images}) => {
    const url = "/products/"+_id 

    const { addProduct } = useContext(CartContext)

    return (
        <ProductWrapper>
            <WhiteBox href={url}>
                <img src={images[0]} /> 
            </WhiteBox>
            <ProductInfoBox>
                <Title href={url}>{title}</Title>
                <PriceRow>
                    <Price>
                        ${price}
                    </Price>
                    <Button onClick={() => addProduct(_id)} primary={1} >Add to cart</Button>
                </PriceRow>
            </ProductInfoBox>
        </ProductWrapper>
    );
}
 
export default ProductBox;