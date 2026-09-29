import bcrypt from "bcryptjs";

import User from "../user/user.model.js";
import { generateToken } from "../../utils/jwt.js";

export const registerUser = async ({
    name,
    email,
    password,
}) => {

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    return user;
};


export const loginUser = async ({
    email,
    password,
}) => {

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const passwordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordCorrect) {
        throw new Error("Invalid email or password");
    }

    const token = generateToken(user._id);

    return {
        user,
        token,
    };
};