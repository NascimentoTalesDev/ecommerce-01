import { MongoClient } from "mongodb";

const client = global.mongodb || new MongoClient();
if (process.env.NODE_ENV === 'production') global.mongodb = client

export default client;