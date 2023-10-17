import { User } from "@/models/User";

export default async function handler(req, res) {
    let { method } = req; 
    const { idUser, idProd } = req.body
    
    if(method === "POST") {
        let user = await User.findOne({_id: idUser})
    
        if(user){

            let existWish = user.wishlist.filter(item => item === idProd);
            console.log(existWish);
            if (existWish.length >= 1) {
                console.log("REMOVIDO");
                let all = user.wishlist.filter(item => item !== idProd);
                while(user.wishlist.length) {
                    user.wishlist.pop();
                }
                all.forEach(element => {
                    user.wishlist.push(element);
                });

                await user.save()
            }else{
                console.log("ADICIONADO");
                user.wishlist.push(idProd);
                await user.save()
            }
            res.json({message: "Wish added successfully!"})

        }
    }

    if (method === "GET") {

        res.json(idUser)
    }
}