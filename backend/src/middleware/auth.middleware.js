import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

const protect = async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) {
                return res.status(401).json({ message: "Not authorized, user not found" });
            }
            next();
        } catch (error) {
            console.error("Token verification error:", error.message);
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, no token" }); 
    }
};

export default protect;