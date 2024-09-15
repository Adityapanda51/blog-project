import jwt from "jsonwebtoken";
import authModel from "../models/authModel.js";

const checkIsAuthenticated = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith("Bearer")) {
        try {
            token = authorization.split(" ")[1];
            //verify token
            const { userId } = jwt.verify(token, "pleaseSubscribe");
            //Get user from token
            req.user = await authModel.findById(userId).select("--password");
            next();
        } catch (error) {
            return res.status(401).json({ message: "unAuthorized User" });
        }
    } else {
        return res.status(401).json({ message: "unAuthorized User" });
    }
};

export default checkIsAuthenticated;