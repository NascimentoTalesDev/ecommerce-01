import Account from "@/components/Account";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function account() {
    
    return(
        <>
            <Header />
            <Account />

        </>
    )   
}

export async function getServerSideProps() {
    await mongooseConnect()
    const allProducts = await Product.find({}, null, {sort: {"_id": -1}})
  
    return {
      props: { 
        allProducts : JSON.parse(JSON.stringify(allProducts)),
      } 
    }
}