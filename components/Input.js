import styled from "styled-components";

const StyledInput = styled.input`
    width: 100%;
    padding: 8px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
    &:focus{
        outline-color: blue;    
    }
`;

const Input = (props) => {
    return (
        <StyledInput {...props}/>
    );
}
 
export default Input;