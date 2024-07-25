import mariadb from 'mariadb';

let connection;

const pool = mariadb.createPool({
    host: 'mariadb',
    user: 'root',
    password: 'root_password',
    connectionLimit: 5
});

async function query(sql) {
    const conn = await pool.getConnection();
    const rows = await conn.query(sql);
    return rows;
}


export { query }