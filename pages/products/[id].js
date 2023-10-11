import Center from "@/components/Center";
import Header from "@/components/Header";
import { Title } from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Box } from "../cart";
import styled from "styled-components";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import { Price } from "@/components/ProductBox";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 40px;
    margin-top: 40px;
`;

export const PriceRow = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
    gap: 20px;
`;

export default function ProductPage({ product }) {

    const { addProduct } = useContext(CartContext)

    return (
        <>
            <Header />
            <Center>
                <ColWrapper>
                    <Box>
                        <ProductImages images={product?.images} />
                    </Box>
                    <div>
                        <Title>{product?.title}</Title>
                        {product?.description}
                        <PriceRow>
                            <Price>
                                ${product.price}
                            </Price>
                            <div>
                                <Button onClick={() => addProduct(product._id)} primary={1} outline={1} >Add to cart</Button>
                            </div>
                        </PriceRow>
                    </div>
                </ColWrapper>
            </Center>
        </>
    )
}

export async function getServerSideProps(context) {
    await mongooseConnect()
    const { id } = context.query;
    const product = await Product.findById(id)

    return {
        props: { product: JSON.parse(JSON.stringify(product)) }
    }
}