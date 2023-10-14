import { useState } from "react";
import styled from "styled-components";

const BigImageContainer = styled.div`
    width: 250px;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: none;
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
    const [magnifyStile, setMagnifyStile] = useState({backgroundImage: `url("${activeImage}")`})

    const Mag = styled.div`
        position: absolute;
        z-index: 10;
        pointer-events: none;
        width: 300px;
        display: none;
        height: 300px;
        border: 2px solid #fff;
        background-size: 200%;
        background-position: center;
        border-radius: 50px;
    `;

    function handleImage(image) {
        setActiveImage(image)
        setMagnifyStile({backgroundImage: `url("${image}")`})
    }

    function handleMouseMove (e) {
        const {offsetX, offsetY} = e.nativeEvent;
        const {offsetWidth, offsetHeight} = e.target;

        const xPercentage = (offsetX / offsetWidth) * 100;
        const yPercentage = (offsetY / offsetHeight) * 100;

        setMagnifyStile((prev) => ({...prev,display: "block", top: `${offsetY -60}px`, left: `${offsetX - 120}px`, backgroundPosition: `${xPercentage}% ${yPercentage}%`}))
    }

    function handleMouseLeave() {
        setMagnifyStile((prev) => ({...prev, display: "none"}))
    }

    return (
        <>
            <BigImageContainer>
                <BigImage onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}  src={activeImage} draggable={false} />
                <Mag style={magnifyStile}></Mag>
 
            </BigImageContainer>
            <ImagesButtons>
                {images.map((image, i) => (
                    <ImageButton key={image} active={image === activeImage} onClick={() => handleImage(image)}>
                        <Image draggable={false} alt={image} src={image} />
                    </ImageButton>
                ))}
            </ImagesButtons>
        </>
    );
}

export default ProductImages;