import { useState } from "react";
import styled from "styled-components";

const BigImageContainer = styled.div`
    width: 250px;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const BigImage = styled.img`
    max-width: 100%;
    max-height: 100%;
`;

const ImagesButtons = styled.div`
    display: flex;
    margin-top: 10px;
    height: 50px;
    gap: 20px;
    width: 100%;
    scroll-X: scroll;
    overflow: hidden;
`;

const ImageButton = styled.div`
    border: 2px solid;
    max-height: 100%;
    max-width: 100%;
    display: flex;
    padding: 2px;
    cursor: pointer;
    border-radius: 5px;
    ${props => props.active ? `
        border-color: #aaa;
    ` 
    :
    `
        border-color: transparent !important;
        opacity: 0.7
    `}
`;

const Image = styled.img`
    height: 100%;
`;

const ProductImages = ({ images }) => {
    const [activeImage, setActiveImage] = useState(images?.[0])
    return (
        <>
            <BigImageContainer>
                <BigImage src={activeImage} draggable={false} /> 
            </BigImageContainer>
            <ImagesButtons>
                {images.map((image, i) => (
                    <ImageButton key={image} active={image === activeImage} onClick={() => setActiveImage(image)}>
                        <Image draggable={false} src={image} />
                    </ImageButton>
                ))}
            </ImagesButtons>
        </>
    );
}

export default ProductImages;