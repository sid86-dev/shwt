import { MongoClient } from 'mongodb'

const uri = process.env.NEXT_PUBLIC_MONGO_URI

if (!process.env.NEXT_PUBLIC_MONGO_URI) {
  throw new Error('Please add your Mongo URI to .env.local')
}

const client = new MongoClient(uri);

export default client;
