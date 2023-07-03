import express  from "express";
import http from 'http';
import bodyParser from "body-parser";
import testRouter from "./routes/test_router.js";
import accountRouter  from "./routes/account_router.js";
import connectDB from "./config/connectDB.js";
import dotenv from "dotenv";


dotenv.config();
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;
const MONGOUSERNAME = process.env.MONGOUSERNAME;
const MONGOPASSWORD = process.env.MONGOPASSWORD;

// console.log(MONGOUSERNAME , MONGOPASSWORD)

connectDB(MONGOUSERNAME, MONGOPASSWORD);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Use Routers here
app.use('/test' , testRouter)
app.use('/user' , accountRouter)

server.listen(PORT)
 