import connection from "../config/database.js";

export const getAllUsers = async () => {
    const [results, fields] = await connection.query('SELECT * FROM Users');
    return results;
};

export const getUserById = async (id) => {
    const [results, fields] = await connection.query('SELECT * FROM Users WHERE id = ?', [id]);
    const user = results && results.length > 0 ? results[0] : {};
    return user;
};

export const updateUserById = async (email, city, name, userId) => {
    const [result, fields] = await connection.query(
        `UPDATE Users 
         SET email = ?, city = ?, name = ? 
         WHERE id = ?`,
        [email, city, name, userId]
    );
    return result;
};
