import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
//import  GithubProvider from "next-auth/providers/github";
//import  GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb";

export default NextAuth({

    providers: [
        //GithubProvider({
        //    clientId: process.env.GITHUB_ID || "",
        //    clientSecret: process.env.GITHUB_SECRET || "",
        //}),
        //GoogleProvider({
        //    clientId: process.env.GOOGLE_CLIENT_ID || "",
        //    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        //}),
        //To normal login
        Credentials({
            id: 'credentials',
            credentials: {
                name:{
                    label: 'Email',
                    type: 'text',
                },
                email:{
                    label: 'Email',
                    type: 'text',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                }
            },

            async authorize(credentials, req,) {

                if (!credentials?.name) {
                    throw new Error('Name is required!');                 
                }
                if (!credentials?.email) {
                    throw new Error('Email is required!');                 
                }
                if (!credentials?.password) {
                    throw new Error('Password is required!');                 
                }

                
                
                return "user"
            }
        })
    ],
    debug: process.env.NODE_ENV === 'development',
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
})

