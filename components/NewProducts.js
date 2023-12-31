import styled from "styled-components";
import ProductBox from "./ProductBox";
import Center from "./Center";

export const ProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 30px;
    padding-top: 30px;
`;

export const Title = styled.h2`
    font-size: 2rem;
    margin: 30px 0 20px;
    font-weight: normal;
`;

const NewProducts = ({products}) => {
    return (
        <Center>
            <Title>New Arrivals</Title>
            <ProductsGrid>
                {products?.length > 0 && products?.map( product => (
                    <ProductBox {...product} />
                ))}
            </ProductsGrid>
        </Center>
    );
}
 
export default NewProducts;