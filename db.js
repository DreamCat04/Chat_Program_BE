const mariadb = require('mariadb');

// Create a connection pool
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'dreamcat04',
  password: 'D4t4b4as3!P4ssw0rd1234',
  database: 'chat_db',
  connectionLimit: 5, // Adjust this value as needed
});

// Export a function to handle database queries
module.exports = {
  query: async (sql, params) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query(sql, params);
      return rows;
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.release(); // release the connection back to the pool
    }
  },
}