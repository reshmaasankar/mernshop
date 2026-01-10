import mongoose from "mongoose";

const connectDb = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB...')
    }catch(err){
        console.log('Error in connection!!!', err);
        process.exit(1)
    }
}

export default connectDb;