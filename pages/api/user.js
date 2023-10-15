import { User } from "@/models/User";

export default async function handler(req, res) {
  
    const { idUser, idProd } = req.body

    console.log(idUser, idProd );

    let user = await User.findOne({_id: idUser})
    
    if(user){

        let wish = user.wishlist.filter(item => item === idProd);
        console.log(wish);
        if (wish.length >= 1) {
            console.log("REMOVIDO");
            
            await user.save()
        }else{
            console.log("ADICIONADO");
            user.wishlist.push(idProd);
            await user.save()
        }
        res.json({message: "Wish added successfully!"})
        
    }
    console.log(user);

    res.json("OK")

}