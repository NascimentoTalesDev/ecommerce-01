import ProductBox from "./ProductBox";
import Center from "./Center";
import { ProductsGrid, Title } from "./NewProducts";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import Auth from "@/pages/auth";


const AllProducts = ({products}) => {
    const { modalUser} = useContext(UserContext)

    return (
        <Center>
            {modalUser && (
                <Auth />
            )}
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