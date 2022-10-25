const { Sequelize } = require('sequelize')
const { 
    MYSQL_DB_NAME,
    MYSQL_USERNAME,
    MYSQL_PASSWORD,
    MYSQL_HOST
} = require('../../config')


module.exports = (async()=>{
  try {
    const sequelize = new Sequelize(
      MYSQL_DB_NAME,
      MYSQL_USERNAME,
      MYSQL_PASSWORD,
      {
        host: MYSQL_HOST,
        dialect: 'mysql',
        logging: false
      }
    )
    await sequelize.authenticate()
    console.log(
      `mysql connect as ${MYSQL_USERNAME} to ${MYSQL_DB_NAME} databse`
    )
    // sequelize.sync({ alter: true })
    return sequelize
  } catch (error) {
    console.log('=========== error start =============')
    console.log(`mysql error`)
    if (error.original.code === 'ECONNREFUSED') {
      console.log('mysql connection error')
    }
    if (error.original.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('username or password is incorrect')
    }
    console.log(error.original)
    console.log('=========== error end =============')

    process.exit(1)
  }
})()