import dotenv from 'dotenv';
import connectDb from './config/db.js';
import Order from './models/orderModel.js';
import Product from './models/productModel.js';
import User from './models/userModel.js';
import users from './data/user.js';
import products from './data/product.js';

dotenv.config();
connectDb();

const importData = async () =>{
    try{
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const insertedUsers = await User.insertMany(users);
        const adminUser = insertedUsers[0]._id;

        const sampleProducts = products.map(p=>{
            return {...p, user: adminUser}
        })

        await Product.insertMany(sampleProducts);
        console.log('Data inserted !!!!');
        process.exit()
    }catch{
        console.log('Errorrr !!!!');
        process.exit(1)
    }
}

const destroyData = async () =>{
    try{
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log('Data destroyed !!!!');
        process.exit()
    }
    catch {
        console.log('Destroy Errorrr !!!!');
        process.exit(1)
    }
}

if(process.argv[2] === '-d'){
    destroyData();
}else{
    importData();
}