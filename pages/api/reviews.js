import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
    
    await mongooseConnect()
    const {method} = req


    if (method === "POST") {
        
        const {idProduct, titleReview, textReview, rating } = req.body; 
        
        const reviews = {
            titleReview,
            textReview,
            rating,
            createdAt: Date()
        } 

        const prod = await Product.findOne({_id: idProduct})

        if(prod){
            prod.reviews.push(reviews)
            await prod.save()

            res.json({message: "Review added successfully!"})
        }

        console.log(prod);
        res.json("OK")
    }
}
