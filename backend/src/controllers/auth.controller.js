import bcrypt from "bcrypt";
import { User } from "../models/user.models.js";
import { generateToken } from "../config/generateToken.js"

export const registerUser = async ( req , res) => {
    const { username, email, password} = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        if (user) {
            const token = generateToken(user._id);

            res.cookie("jwt", token, {
                httpOnly: true,
                secure: true,
                sameSite: "None",
                maxAge: 3 * 24 * 60 * 60 * 1000,
            });

            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token,
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({ message: 'Login failed: User not found with this email.' });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken(user._id);

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 3 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token,
        });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    } 
};

export const logoutUser = (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        expires: new Date(0),
    });
    res.status(200).json({ message: "Logout successful" });
}