const { getRow } = require('../db')


class User{
    constructor(username, password){
        this.username = username
        this.password = password
    }
    static async findUser(username, password){
        let sql = `SELECT * FROM USER WHERE username=? and password=?` ;
        try {
            let user = await getRow(sql, [username, password])
            return user ? user : null
        }catch (error) {
            console.log(error)
            return null
        }
        
    }
}

module.exports = User
