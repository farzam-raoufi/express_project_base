module.exports = {
    PORT            :   process.env.PORT || 3000,
    APP_ENV         :   process.env.NODE_ENV || "development",
    MYSQL_DB_NAME   :   process.env.MYSQL_DB_NAME || "express_project_base",
    MYSQL_USERNAME  :   process.env.MYSQL_USERNAME || "root",
    MYSQL_PASSWORD  :   process.env.MYSQL_PASSWORD || "",
    MYSQL_HOST      :   process.env.MYSQL_HOST || "172.19.0.2",
}