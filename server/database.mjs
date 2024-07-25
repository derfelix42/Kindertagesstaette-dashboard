import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: process.env.DB_HOST || 'mariadb',
    user: 'root',
    password: 'root_password',
    database: "tagesstaette",

    connectionLimit: 5
});

async function query(sql) {
    const conn = await pool.getConnection();
    const rows = await conn.query(sql);
    return rows;
}


export { query }