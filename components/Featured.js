import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import Cart from "./icons/Cart";

const Bg = styled.div`
    background-color: #222;
    color: #fff;
    padding: 50px 0;
`;

const Title = styled.h1`
    margin: 0;
    font-weight: normal;
    font-size: 3rem;
`;

const Desc = styled.p`
    color: #aaa;
    font-size: 0.8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  img{
    max-width: 100%;
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

const Featured = ({product}) => {
    return (
        <Bg>
            <Center>
                <ColumnsWrapper>
                    <Column>
                        <div>
                            <Title>{product?.title}</Title>
                            <Desc>{product?.description}</Desc>
                            <ButtonsWrapper>
                                <Button value={product?._id} white outline  size="l">Read more</Button>
                                <Button value={product?._id} primary size="l"><Cart width='16px'/> Add to cart</Button>
                            </ButtonsWrapper>
                        </div>
                    </Column>
                    <Column>
                        <img src={product?.images[0]}></img>
                    </Column>
                </ColumnsWrapper>
            </Center>
        </Bg>
    );
}

export default Featured;