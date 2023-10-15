import { signIn } from 'next-auth/react';

import Button from "@/components/Button";
import Input from "@/components/Input";
import CloseIcon from "@/components/icons/CloseIcon";
import { useCallback, useContext, useState } from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import axios from "axios";
import { UserContext } from "@/context/UserContext";

const Div = styled.div`
    position: fixed;
    background: rgba(0, 0, 0, 0.8);
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 10;
`;
const Container = styled.div`
    height: 100%;
    width: 100%;
`
const ContainerButton = styled.div`
    text-align: right;
`
const CloseButton = styled.button`
margin: 20px 20px 0 0;
width: 30px;
border: none;
background-color: transparent;
color: #fff;
cursor: pointer;
`
const ContainerAuth = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`
const AuthLogReg = styled.div`
    width: 90%;
    max-width: 400px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background: #fff;
    color: #000;
`
const Items = styled.div`
    width: 90%;
    margin: auto;
    padding: 10px 0;

    h2{
        font-size: 2rem;
    }
`
const PContainer = styled.div`
    span{
        cursor: pointer;
        margin-left: 5px;
        color: blue
    }
`;
const ProvidersContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 20px 0;
`;
const IconProvider = styled.span`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: #fff;
    border-radius: 50%;
    border: 1px solid #ccc;
`;

const Auth = () => {
    const { setModalUser, setUser } = useContext(UserContext)

    const [variant, setVariant] = useState('login')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    
    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? "register" : "login")
    },[])

    const logInGoogle = useCallback( async () => {
        try {
            await signIn('google', {
                redirect: false,
                callbackUrl: "/"
            })
        } catch (error) {
            console.log(error);
        }
    },[])

    const login = useCallback( async () => { 

        try {
            await signIn("credentials", {
                email,
                password,
            
                redirect: false,
            })
            .then(Response => {
                console.log(Response);
                setModalUser(false)
            })   
        } catch (error) {            
            console.log(error)
        }   

    }, [email, password])

    const register = useCallback( async () => {
        
        try {
            await axios.post("/api/register", {
                email,
                name,
                password,
            })
            login()
        } catch (error) {
            console.log(error);
        }
    }, [email, name, password, login])
    
    return (
        <Div>
            <Container>
                <ContainerButton>
                    <CloseButton onClick={() => setModalUser(false)}>
                        <CloseIcon />
                    </CloseButton>
                </ContainerButton>
                <ContainerAuth>
                    <AuthLogReg>
                        <Items>
                            <h2 className="text-white text-4xl mb-8 font-semibold">
                                {variant === 'login' ? "Sign in " : "Register"}
                            </h2>
                            {variant !== 'login' && (
                                <Input name="name" placeholder="Name" type="text" value={name} onChange={(ev) => setName(ev.target.value)} />
                            )}
                            <Input name="email" placeholder="Email"  type="text" value={email} onChange={(ev) => setEmail(ev.target.value)} />
                            <Input name="password" placeholder="Password" type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} />
                            {variant !== 'login' && (
                                <Input name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(ev) => setConfirmPassword(ev.target.value)} />
                            )}
                            <Button onClick={variant !== "login" ? register : "login"} black={1} paddingY={1}>
                                {variant !== "login" ? 
                                        "Register" 
                                        : "Login" 
                                }
                            </Button>
                            <ProvidersContainer>
                                <IconProvider onClick={() => logInGoogle()}>
                                    <FcGoogle size={30}/>
                                </IconProvider>
                                <IconProvider onClick={() => logInGithub()}>
                                    <FaGithub size={30}/>
                                </IconProvider>
                            </ProvidersContainer>
                            <PContainer>
                                {variant !== "login" ? "Already have an account?" : "First time here?"} 
                                <span onClick={toggleVariant} >
                                    {variant !== "login" ? "Login" : "Create an account" }
                                </span>
                            </PContainer>
                        </Items>
                    </AuthLogReg>
                </ContainerAuth>
            </Container>
        </Div>
    );
}
 
export default Auth;