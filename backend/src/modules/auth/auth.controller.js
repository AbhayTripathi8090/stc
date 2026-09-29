import {
    registerUser,
    loginUser,
} from "./auth.service.js";


export const register = async (req, res) => {
    try {

        const user = await registerUser(req.body);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }
};


export const login = async (req, res) => {
    try {

        const { user, token } =
            await loginUser(req.body);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({
            success: true,
            message: "Login successful",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {

        res.status(401).json({
            success: false,
            message: error.message,
        });

    }
};


export const logout = (req, res) => {

    res.clearCookie("token");

    res.json({
        success: true,
        message: "Logout successful",
    });
};