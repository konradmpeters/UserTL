const sql = require("mssql/msnodesqlv8");

const config = require('./config');
const connPool = new sql.ConnectionPool(config);

module.exports = connPool;