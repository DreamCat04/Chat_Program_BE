const mariadb = require('mariadb');
const fs = require('fs');

// Create a connection pool
const pool = mariadb.createPool({
  host: 'nextcloud-clone-db',
  user: 'dreamcat04',
  password: 'D4t4b4s3!P4ssw0rd1234',
  database: 'chat_db',
  connectionLimit: 5 // Adjust this value as needed
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
fs.readFile('init.sql', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading initialization script:', err);
    return;
  }

  pool.getConnection()
    .then((conn) => {
      return conn.query(data);
    })
    .then(() => {
      console.log('Database initialization completed successfully.');
    })
    .catch((err) => {
      console.error('Error executing initialization script:', err);
    })
    .finally(() => {
      pool.end();
    });
});