import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from './middleware/logger.js';
import path, { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cors from './middleware/CORS.js'
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../config/.env") });

const PORT = process.env.PORT || 5000;
if (!PORT) {
  console.error('PORT is not defined. Check your .env file or dotenv configuration.');
  process.exit(1); // like system('exit');
}

const app = express();

//middleware
app.use("/localDB", express.static(path.join(__dirname, "../localDB")));

app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger);

    
//APIs
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/', (req, res) => {
    res.status(200).json("connected succesfully");
})


const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
.then(() => {
    console.log("conntected to MongoDB");
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    });
}).catch ((error) => {
    console.error("Error creating connection", error);
}); 

export default app;

/*
Notes 
Body Parser:
body-parser is a middleware package in Node.js used for parsing incoming request bodies 
in a middleware-like format before handling them. It is commonly used in Express.js applications 
to process request data (such as form submissions, JSON payloads, etc.) and make it available via req.body.
*/