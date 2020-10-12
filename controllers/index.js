// const sql = require("mssql");

// async function executeQuery(req, res, next) {
//     try {
//         // connect to MSSQL DB
//         let connection = await new sql.ConnectionPool(config);
//         //create Request
//         let request = await new sql.Request(connection);
//         //console.log(request);
//         // query to DB
//         let result = await request.query(q);
//         console.log(result);
//         res.send(result);
//         // close connection
//         await connection.close();
//     } catch (err) {
//         console.log(`DB error: ${err.message}`);
//     }

// };

// module.exports = {
//     async executeQuery(req, res, next) {
//         try {
//             // connect to MSSQL DB
//             let cnn = await new sql.ConnectionPool(configFile);
       
//             // query
//             let result = await sql.query(q);
//             console.log(result);
//             res.send(result);
        
//             // close connection
//             await cnn.close();
//        } catch (err) {
//            console.log(`DB connection error: ${err.message}`);
//        }
//     }
// }