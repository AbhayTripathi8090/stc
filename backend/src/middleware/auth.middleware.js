import { verifyToken } from "../utils/jwt.js";

const protect = (req, res, next) => {
    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        const decoded = verifyToken(token);

        req.userId = decoded.userId;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });

    }
};

export default protect;