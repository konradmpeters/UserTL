
// const config = {
//     // user: 'kmpeters',
//     // password: '****',
//     domain:'dao-domain',
//     server: 'devsql01',
//     database: 'northwind',
//     driver: "msnodesqlv8",
//     options: {
//         trustedConnection: true
//     },
//     pool: {
//         max: 10,
//         min: 0,
//         idleTimeoutMillis: 70000  // 30000
//     }
// };


const config = {
    user: 'admin',
    password: 'Klari$e99',
    //domain:'dao-domain',
    server: 'dbmssqltest1.cwn0zyywx0oq.us-west-1.rds.amazonaws.com',
    port: 1433,
    database: 'dbTest1',
    driver: "msnodesqlv8",
    // options: {
    //     trustedConnection: true
    // },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 70000  // 30000
    }
};

module.exports = config;