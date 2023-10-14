import { primary } from "@/lib/colors";
import styled, { css } from "styled-components";

export const ButtonStyle = css`
    border: 0;
    padding: 5px 15px;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    gap: 5px;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    
    ${props => props.block && css `
        display: block;
        width: 100%;
    `}
    ${props => props.paddingY && css `
        padding: 10px 20px;  
    `}

    ${props => props.black && !props.outline && css`
        background-color: #000;
        color: #fff;
    `}
    ${props => props.black && props.outline && css`
        background-color: transparent;
        border: 1px solid #FFF;
        color: #FFF;
    `}

    ${props => props.white && !props.outline && css`
        background-color: #FFF;
        color: #000;
    `}
    ${props => props.white && props.outline && css`
        background-color: transparent;
        border: 1px solid #FFF;
        color: #FFF;
    `}

   ${props => props.primary && props.outline && css`
        background-color: ${primary};
        border: 1px solid ${primary};
        color: #FFF;
    `}
    ${props => props.primary && !props.outline && css`
        background-color: transparent;
        border: 1px solid ${primary};
        color: ${primary};
        font-weight: 500;
    `}
    
    ${props => props.size === "l" && css`
        font-size: 1.2rem;
        padding: 10px 20px;
    `}

    ${props => props.isLoadingReview  ? 
        `
            cursor: wait;
            opacity: 0.8
        ` 
        : 
        `
            cursor: pointer
        `
    }
`

const StyledButton = styled.button`
    ${ButtonStyle}
`;

const Button = ({ children, ...props }) => {
    return (
        <StyledButton {...props}>{children}</StyledButton>
    );
}

export default Button;