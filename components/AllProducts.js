import ProductBox from "./ProductBox";
import Center from "./Center";
import { ProductsGrid, Title } from "./NewProducts";


const AllProducts = ({products}) => {
    console.log("All Products", products );
    return (
        <Center>
            <Title>All Products</Title>
            <ProductsGrid>
                {products?.length > 0 && products?.map( product => (
                    <ProductBox {...product} />
                ))}
            </ProductsGrid>
        </Center>
    );
}
 
export default AllProducts;