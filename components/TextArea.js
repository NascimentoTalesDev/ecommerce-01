import styled from "styled-components";

const StyledTextArea = styled.textarea`
    width: 100%;
    padding: 8px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
    resize: none;
    &:focus{
        outline-color: blue;    
    }
`;

const TextArea = (props) => {
    return (
        <StyledTextArea {...props}/>
    );
}
 
export default TextArea;