const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const connectDB = require('./Models/db');
const AuthRouter = require('./Routes/AuthRouter');
const TransactionRouter = require('./Routes/TransactionRouter');
// const AIInsightsRouter = require('./Routes/AIInsightsRouter');
dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
connectDB();


app.use('/api/auth', AuthRouter);
app.use('/api/transactions', TransactionRouter);
// app.use('/api/ai', AIInsightsRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));