import { createGlobalStyle } from "styled-components"
import { Poppins } from 'next/font/google'
import CartContextProvider from "@/context/CartContext";
import UserContextProvider from "@/context/UserContext";

const font = Poppins({ 
  subsets: ['latin'],
  weight: ["400", "500", "700"], 
})

const GlobalStyles = createGlobalStyle`
  *{
    padding:0;
    margin:0;
    box-sizing: border-box;
  }
  body{
    background-color: #eee;

  }
`;

export default function App({ Component, pageProps }) {
  return(
    <div className={`${font.className}`}>
      <GlobalStyles />
      <UserContextProvider>
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </UserContextProvider>
    </div>
  ) 
}
