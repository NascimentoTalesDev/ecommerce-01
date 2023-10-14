import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { useRouter } from "next/router";

const StyledHeader = styled.header`
    background-color: #222;
`;

const Logo = styled(Link)`
    color: #fff;
    text-decoration: none;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
`;

const StyledNav = styled.div`
    display: flex;
    gap: 15px;
`;

const NavLink = styled(Link)`
    text-decoration: none;
    color: ${props => props.pathname ? `
        #fff
    ` : `
        #ccc
    `};
`;

const Header = () => {
    const { cartProducts } = useContext(CartContext)

    const router = useRouter();
    const {pathname} = router;

    return (
        <StyledHeader>
            <Center>
                <Wrapper>
                    <Logo href={'/'}>Ecommerce</Logo>
                    <StyledNav>
                        <NavLink pathname={pathname === '/'} href={'/'} >Home</NavLink>
                        <NavLink pathname={pathname === '/all-products'} href={'/all-products'}>All products</NavLink>
                        <NavLink pathname={pathname === '/categories'} href={'/categories'}>Categories</NavLink>
                        <NavLink pathname={pathname === '/account'} href={'/account'}>Account</NavLink>
                        <NavLink pathname={pathname === '/cart'} href={'/cart'}>Cart ({cartProducts.length})</NavLink>
                    </StyledNav>
                </Wrapper>
            </Center>
        </StyledHeader>
    );
}

export default Header;