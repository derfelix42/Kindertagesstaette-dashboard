
import express from 'express';
import { getQuotes } from './database.mjs';
import os from 'os';

const app = express();
const PORT = 80;

app.use(express.static('static'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/quotes', async (req, res) => {
    const rows = await getQuotes();
    res.json(rows);
}
);

// async function main() {
//     let rows = await query("SELECT 1 as val");
//     console.log(rows)

//     rows = await query("SELECT 1 as val");
//     console.log(rows)

//     rows = await query("SELECT 1 as val");
//     console.log(rows)

//     rows = await query("SELECT 1 as val");
//     console.log(rows)

//     rows = await query("SELECT 1 as val");
//     console.log(rows)

//     rows = await query("SELECT 1 as val");
//     console.log(rows)
// }

// main()