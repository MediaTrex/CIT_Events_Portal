import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true
});

pool.getConnection()
  .then(conn => {
    console.log("✅ MySQL Pool Connected");
    conn.release();
  })
  .catch(err => {
    console.error("❌ MySQL Connection Error:", err.message);
  });

export const getDB = async () => {
  return pool.getConnection();
};


// import mysql from 'mysql2/promise';
// import dotenv from 'dotenv';
// dotenv.config();

// const createDB = async () => mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME,
//   multipleStatements : true
// });

// createDB().then(connection => {
//   if (global.connection = connection) {
//   console.log('--- Connected to MySQL ---');
//   }else{
//   console.log('--- MySQL Connection Error ---');
//   }
// });

// export default createDB;