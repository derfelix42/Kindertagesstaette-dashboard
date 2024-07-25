
import express from 'express';
import { query } from './database.mjs';
import os from 'os';

const app = express();
const PORT = 80;

app.use(express.static('static'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

async function main() {
    const rows = await query("SELECT 1 as val");
    console.log(rows)
}

main()