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
  gap: 5px;
`;

const Featured = () => {
    return (
        <Bg>
            <Center>
                <ColumnsWrapper>
                    <Column>
                        <div>
                            <Title>Tithjdfhgdsfghbdafhgble</Title>
                            <Desc>Descrdfgvdfagbvdagvbdagvadfbvdfabd  ger gerq ger g er ger ger gerg edrfg edas grdsa ge gaedrrfgaegeiption</Desc>
                            <ButtonsWrapper>
                                <Button white outline size="l">Read more</Button>
                                <Button primary size="l"><Cart width='20px'/> Add to cart</Button>
                            </ButtonsWrapper>
                        </div>
                    </Column>
                    <Column>
                        <img src="https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/inspiron-notebooks/inspiron-15-3511/media-gallery/in3511nt_cnb_05000ff090_bk-fpr.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=606&qlt=100,1&resMode=sharp2&size=606,402&chrss=full"></img>
                    </Column>
                </ColumnsWrapper>
            </Center>
        </Bg>
    );
}

export default Featured;