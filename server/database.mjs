import mariadb from 'mariadb';

const host = process.env.DB_HOST || 'mariadb'
// console.log("DB Hostname", host)

const pool = mariadb.createPool({
    host: host,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root_password',
    database: "tagesstaette",

    connectionLimit: 5
});

async function query(sql) {
    let rows;
    let conn;
    try {
        conn = await pool.getConnection();
        rows = await conn.query(sql);
    } catch (ex) {
        console.log("error querying...")
    } finally {
        conn?.end();
    }
    return rows;
}


export { query }