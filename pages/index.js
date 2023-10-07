import Featured from '@/components/Featured'
import Header from '@/components/Header'
import { mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Product'

export default function HomePage({product}) {
  console.log(product);
  return (
    <>
      <Header />
      <Featured product={product}/>
    </>
  )
}

export async function getServerSideProps() {
  const featuredProductId = "651c89e45d073720e17cd4b2"
  await mongooseConnect()
  const product = await Product.findById(featuredProductId)

  return {
    props: {product : JSON.parse(JSON.stringify(product))} 
  }
}
 
