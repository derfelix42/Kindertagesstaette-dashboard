import mariadb from 'mariadb';

const host = process.env.DB_HOST || 'mariadb';

const pool = mariadb.createPool({
    host: host,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root_password',
    database: "tagesstaette",

    connectionLimit: 5
});

async function query(sql, params = []) {
    let rows;
    let conn;
    try {
        conn = await pool.getConnection();
        rows = await conn.query(sql, params);
    } finally {
        conn?.end();
    }
    return rows;
}

async function getQuotes() {
    try {
        return await query("SELECT * FROM quotes ORDER BY created_at DESC");
    } catch(error) {
        console.log(error);
        return [];
    }
}

async function getQuotesFromAuthor(author) {
    try {
        return await query("SELECT * FROM quotes WHERE author = ?", [author]);
    } catch(error) {
        console.log(error);
        return [];
    }
}

async function addQuote(author, quote, recipient, emotion) {
    try {
        // Start building the query and parameter array
        let queryStr = `INSERT INTO quotes (author, quote`;
        let params = [author, quote];

        // Conditionally add `recipient` and `emotion` if provided
        if (recipient) {
            queryStr += `, recipient`;
            params.push(recipient);
        }
        if (emotion) {
            queryStr += `, emotion`;
            params.push(emotion);
        }

        queryStr += `) VALUES (${params.map(() => '?').join(', ')})`;

        await query(queryStr, params);
        return true;
    } catch (error) {
        console.error("Error:", error);
        console.log("Adding quote failed!");
        return false;
    }
}

async function getAuthorStats() {
    try {
        
        const rows = await query("SELECT author, COUNT(quote) AS count FROM quotes GROUP BY author ORDER BY count DESC, author ASC");
        return rows;
    } catch (error) {
        console.log("Error fetching author stats:", error);
        return [];
    }
}

export { getQuotes, getQuotesFromAuthor, addQuote, getAuthorStats };
