import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: 'db4free.net',     
  user: 'admin_school_api',           
  password: 'mysqlfree',   
  database: 'school_api', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool