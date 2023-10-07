import styled from "styled-components";

const Box = styled.div`
    padding: 20px;
    background-color: #fff;
`;

const ProductBox = ({_id, title}) => {
    return (
        <Box>
            {title}
        </Box>
    );
}
 
export default ProductBox;