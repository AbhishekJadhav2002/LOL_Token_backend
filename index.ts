import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import connectDatabase from './config/database.config';
import { init } from './config/initializers';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3000, async () => {
    try {
        await connectDatabase();
        init('bsc');
        init('eth');
        console.log('🚀 Server is running on port 3000');
    } catch (error) {
        console.error(error);
        await mongoose.connection.close();
        process.exit(1);
    }
});

process.on('uncaughtException', async err => {
    console.log('UNCAUGHT EXCEPTION!!! shutting down...')
    console.log(err.name, err)
    await mongoose.connection.close()
    process.exit(1)
});

process.on('unhandledRejection', async (err: any) => {
    console.log('UNHANDLED REJECTION!!!  shutting down ...')
    console.log(err.name, err)
    await mongoose.connection.close()
    process.exit(1)
});