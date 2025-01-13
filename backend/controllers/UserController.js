import User from "../models/User.model.js";
import bcrypt, {compare} from 'bcrypt';
import getIdFromJWT from "./getIdFromJWT.js";
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../config/.env") });


const createUser = async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        res.status(201).json({message: "user created", user});
        
    }catch (error) {
        console.error("Error occurred while creating user: ", error); 
        res.status(500).json({message: error.message});
    }
};

const deleteUser = async (req, res) => {
        const id = getIdFromJWT(req);
        const user = await User.findById(id);
        
        if (!user) {    
            return res.status(404).json({ message: 'User not found' });
        }

        await User.findByIdAndDelete(user._id);
};


const loginUser = async (req, res) => {     
    try {
        console.log("in login user");
        const { state, password } = req.body;
        const searchField = state === "username" ? "username" : "email";
        const searchValue = req.body[searchField];

        console.log("in login user");


        const user = await User.findOne({ [searchField]: searchValue });
        
        if (!user || !(await compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log("in login user: user ", user);

        const token = jwt.sign( 
            { id: user._id, email: user.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h', algorithm: 'HS256' }
        );

        console.log("in login user: token ", token);

        // token to be sent in response.
        res.status(200).json({ 
            message: "Login successful",
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


const logoutUser = (req, res) => { // this is so easy, sessions were relly tiresome
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
};

export default { createUser, deleteUser, loginUser, logoutUser };