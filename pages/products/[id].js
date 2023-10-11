import Center from "@/components/Center";
import Header from "@/components/Header";
import { Title } from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Box } from "../cart";
import styled from "styled-components";
import ProductImages from "@/components/ProductImages";

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 40px;
    margin-top: 40px;
`;

export default function ProductPage({product}) {
    return(
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
      props: { product : JSON.parse(JSON.stringify(product)) } 
    }
}