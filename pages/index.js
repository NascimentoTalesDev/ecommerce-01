import Featured from '@/components/Featured'
import Header from '@/components/Header'
import NewProducts from '@/components/NewProducts';
import { mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Product'

export default function HomePage({featuredProduct, newProduct}) {
  console.log(newProduct);
  return (
    <>
      <Header />
      <Featured product={featuredProduct}/>
      <NewProducts products={newProduct} />
    </>
  )
}

export async function getServerSideProps() {
  const featuredProductId = "651c89e45d073720e17cd4b2"
  await mongooseConnect()
  const featuredProduct = await Product.findById(featuredProductId)
  const newProduct = await Product.find({}, null, {sort: {"_id": -1} , limit: 10})

  return {
    props: { 
      featuredProduct : JSON.parse(JSON.stringify(featuredProduct)),
      newProduct : JSON.parse(JSON.stringify(newProduct))
    } 
  }
}
 
