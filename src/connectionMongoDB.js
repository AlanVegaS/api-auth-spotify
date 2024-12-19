import { MongoClient } from "mongodb";

const getConnection = async () => {
    try {
        const mongoUrl = process.env.MONGO_URI;
        const client = await MongoClient.connect(mongoUrl);
        return client.db();
    } catch (error) {
        console.error(error);
    }
};

export { getConnection };