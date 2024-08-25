// const express = require('express');
import express from 'express';
import { connectDb } from './db/connectdb.js';
import authRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
const app = express();

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:5173', credentials: true}));
app.use('/api/auth', authRoutes);

connectDb();

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend/dist', 'index.html'))
    })
}



app.listen(process.env.PORT || 5000, () => {
    console.log("http://localhost:3000");
});

