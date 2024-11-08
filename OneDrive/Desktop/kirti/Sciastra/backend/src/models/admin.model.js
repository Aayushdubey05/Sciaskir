import db from "../database/db.js";
import bcrypt from "bcrypt";
export const createAdmin = async (username, password) => {
    const [result] = await db.execute("INSERT INTO admins (username, password) VALUES (?, ?)", [username, password]);
    return result;
};

export const findAdminByUsername = async (username) => {
    const [rows] = await db.execute('SELECT * FROM admins WHERE username = ?', [username]);
    return rows[0];
};

export const validatePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};


