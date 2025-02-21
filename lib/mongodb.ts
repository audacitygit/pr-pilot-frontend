/* eslint-disable @typescript-eslint/no-explicit-any */
import { MongoClient, MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI!;
if (!uri) throw new Error("Please define the MONGODB_URI environment variable");

// Correctly typed MongoDB connection options
const options: MongoClientOptions = {
    tls: true, // ✅ Ensures encrypted connection
    ssl: true, // ✅ Backup SSL enforcement
    retryWrites: true,
    w: "majority" as const, // ✅ Fix: Explicitly assign "majority" as a valid type
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
    if (!(global as any)._mongoClientPromise) {
        client = new MongoClient(uri, options);
        (global as any)._mongoClientPromise = client.connect();
    }
    clientPromise = (global as any)._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;
