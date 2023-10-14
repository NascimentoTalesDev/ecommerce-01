import { User } from "@/models/User"
import bcrypt from "bcrypt"

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).end()
    }

    const { name, email, password } = req.body
    
    if (!name) {
        return res.status(400).json({ type:"name", message: "Username is required!"})
    }

    if (!email) {
        return res.status(400).json({ type:"email", message: "Email is required!"})
    }

    if (!password) {
        return res.status(400).json({ type:"password", message: "Password is required!" })
    }

    const existingUser = await User.findOne({email});

    if (existingUser) {
        res.status(400).json({ type:"email in use", message: "Email already in use!" })
        return 
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await User.create({
            name,
            email,
            hashedPassword,
        })

        return res.status(200).json(user)

    } catch (error) {
        console.log(error);
        res.status(400).end()
    }
}