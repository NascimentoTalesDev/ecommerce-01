import styled from "styled-components";
import ProductBox from "./ProductBox";
import Center from "./Center";

const ProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    padding-top: 20px;
`;

const NewProducts = ({products}) => {
    return (
        <Center>
            <ProductsGrid>
                {products?.length > 0 && products?.map( product => (
                    <ProductBox {...product} />
                ))}
            </ProductsGrid>
        </Center>
    );
}
 
export default NewProducts;