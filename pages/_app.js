import { createGlobalStyle } from "styled-components"
import { Poppins } from 'next/font/google'

const font = Poppins({ 
  subsets: ['latin'],
  weight: ["400", "500", "700"], 
})

const GlobalStyles = createGlobalStyle`
  body{
    background-color: #eee;
    padding:0;
    margin:0;
  }
`;

export default function App({ Component, pageProps }) {
  return(
    <div className={`${font.className}`}>
      <GlobalStyles />
      <Component {...pageProps} />
    </div>
  ) 
}
