const connection = require("../config/database")
const getAllUsers = async () => {
    const [results, fields] = await connection.query(
        'select * from Users'
    )
    return results
}
const getUserById = async (id) => {
    const [results, fields] = await connection.query(`select * from Users where id =?`, [id])
    const user = results && results.length > 0 ? results[0] : {}
    return user
}
const updateUserById = async (email, city, name, userId) => {
    const [result, fields] = await connection.query(
        `UPDATE Users 
         SET email = ?,city = ?,name = ? WHERE id =? `, [email, city, name, userId]
    )
}

module.exports = {
    getAllUsers, getUserById, updateUserById
}