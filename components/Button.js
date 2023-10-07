import styled, { css } from "styled-components";

const StyledButton = styled.button`
    border: 0;
    padding: 5px 15px;
    border-radius: 5px;
    cursor: pointer;
    ${props => props.white && !props.outline && css`
        background-color: #FFF;
        color: #000;
    `}
    ${props => props.white && props.outline && css`
        background-color: transparent;
        border: 1px solid #FFF;
        color: #FFF;
    `}
    ${props => props.primary  && css`
        background-color: #5542F6;
        border: 1px solid #5542F6;
        color: #FFF;
    `}
    ${props => props.size === "l" && css`
        font-size: 1.2rem;
        padding: 10px 20px;
    `}
`;

const Button = ({children, ...props}) => {
    return (
        <StyledButton {...props}>{children}</StyledButton>
    );
}
 
export default Button;