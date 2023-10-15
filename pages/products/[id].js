import Center from "@/components/Center";
import Header from "@/components/Header";
import { Title } from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Box } from "../cart";
import styled from "styled-components";
import ProductImages from "@/components/ProductImages";
import Button, { ButtonStyle } from "@/components/Button";
import { Price } from "@/components/ProductBox";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/context/CartContext";
import Star from "@/components/Star";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import axios from "axios";
import { primary } from "@/lib/colors";
import { useRouter } from "next/router";
import { UserContext } from "@/context/UserContext";
import useCurrentUser from "@/hooks/useCurrentUser";
import Auth from "../auth";

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 40px;
    margin-top: 40px;
`;

export const PriceRow = styled.div`
display: flex;
align-items: center;
margin-top: 10px;
gap: 20px;
`;

const ColWrapperReviews = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin-top: 40px;
`;

const H2Element = styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 40px;
    margin-bottom: -30px;
`;
const H3Element = styled.h3`
    font-size: 1rem;
`;
const InfoReviews = styled.div`
    margin-top: 20px;
`;
const StarContainer = styled.div`
    display: flex;
    color: #fff;
`;

const StarContainerDate = styled.div`
    display: flex;
    justify-content: space-between;
    color: #fff;
`;

const InputStar = styled.input`
    display: none;
`;
const InfoReviewsBox = styled.div`
    border-top: 1px solid #ccc;
    margin-top: 20px;
`;
const Time = styled.div`
    color: black;

`;

export default function ProductPage({ product }) {
    const { data: user } = useCurrentUser()
    const { isLoggedIn, modalUser } = useContext(UserContext)
    const { addProduct } = useContext(CartContext)

    const [rating, setRating] = useState(null)
    const [titleReview, setTitleReview] = useState("")
    const [textReview, setTextReview] = useState("")
    const [hover, setHover] = useState(null)
    const [isLoadingReview, setIsLoadingReview] = useState(false)

    
    const router = useRouter();
    const { id } = router.query;

    function addFeaturedToCart() {
        if(!user){
            isLoggedIn()
            return
        }
        addProduct(product._id)
    }


    async function postReviews() {
        setIsLoadingReview(true)
        let idProduct = id
        let data = { idProduct, titleReview, textReview, rating }
        let res = await axios.post("/api/reviews", data)
        window.location.reload()
        setTitleReview("")
        setTextReview("")
        setRating(null)
        setIsLoadingReview(false)
    }



    return (
        <>
            {modalUser && (
                <Auth />
            )}
            <Header />
            <Center>
                <ColWrapper>
                    <Box>
                        <ProductImages images={product?.images} />
                    </Box>
                    <div>
                        <Title>{product?.title}</Title>
                        {product?.description}
                        <PriceRow>
                            <Price>
                                ${product.price}
                            </Price>
                            <div>
                                <Button onClick={addFeaturedToCart} primary={1} outline={1} >Add to cart</Button>
                            </div>
                        </PriceRow>
                    </div>
                </ColWrapper>
                <H2Element>
                    Reviews
                </H2Element>
                <ColWrapperReviews>
                    <Box>
                        <H3Element>Add a new review</H3Element>
                        <InfoReviews>
                            <StarContainer>
                                {[...Array(5)].map((star, index) => {
                                    const currentRating = index + 1

                                    return (
                                        <label key={product.id}>
                                            <InputStar
                                                type="radio"
                                                name="rating"
                                                value={currentRating}
                                                onClick={() => setRating(currentRating)}
                                            />

                                            <Star
                                                width="30px"
                                                color={currentRating <= (hover || rating) ? `${primary}` : "gray"}
                                                onMouseEnter={() => setHover(currentRating)}
                                                onMouseLeave={() => setHover(null)}
                                            />
                                        </label>
                                    )
                                })}
                            </StarContainer>
                            <Input required placeholder="Title" value={titleReview} onChange={(ev) => setTitleReview(ev.target.value)} />
                            <TextArea required placeholder="Write here your review" rows="3" cols="10" value={textReview} onChange={(ev) => setTextReview(ev.target.value)} />
                        </InfoReviews>
                        <Button isLoadingReview={isLoadingReview} onClick={postReviews} primary={1} outline={1} >{isLoadingReview ? "Saving review..." : "Submit your review"}</Button>
                    </Box>
                    <Box>
                        <H3Element>All reviews</H3Element>
                        {product.reviews.length < 1 &&  (
                            <InfoReviews>
                                Be the first to review
                            </InfoReviews>
                        )}
                        {product.reviews.length > 0 && product.reviews.map(review => (
                            <InfoReviewsBox>
                                <StarContainerDate>
                                    <StarContainer>
                                        {[...Array(review.rating)].map(star => {
                                        
                                            return (
                                                <Star width="20px" color={primary} />
                                            )
                                        })}
                                    </StarContainer>
                                    <Time>
                                        {new Date(review.createdAt).toLocaleString()}
                                    </Time>
                                </StarContainerDate>
                                <div>{review.titleReview}</div>
                                <div>{review.textReview}</div>
                            </InfoReviewsBox>
                        ))}
                    </Box>
                </ColWrapperReviews>
            </Center>
        </>
    )
}

export async function getServerSideProps(context) {
    await mongooseConnect()
    const { id } = context.query;
    const product = await Product.findById(id)

    return {
        props: { product: JSON.parse(JSON.stringify(product)) }
    }
}
