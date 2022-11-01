const { DataTypes } = require("sequelize");
const { APP_ENV } = require("../../../config");
const { mysql } = require("../../../Modules/Databases_Config");

module.exports = (async()=>{
    const mysql_connection = await mysql
    const User = mysql_connection.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique: true 
        },
        name: DataTypes.STRING,
        family: DataTypes.STRING,
        password: DataTypes.STRING,
        salt: DataTypes.STRING,
    });
    if (APP_ENV === "development") {
        //  - This checks what is the current state of the tablein
        //  the database (which columns it has, what are their data
        //  types, etc), and then performs the necessary changes in
        //  the table to make it match the model.
        
        // mysql_connection.sync({ force: true })
    }
    
    return User
})()
