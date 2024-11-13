
import express from 'express';
import { addQuote, getAuthorStats, getQuotes, getQuotesFromAuthor } from './database.mjs';
import bodyParser from 'body-parser';

const app = express();
const PORT = 8000;

app.use(express.static('static'));
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


app.get('/quotes', async (req, res) => {
    const rows = await getQuotes();
    return res.json(rows);
});

app.post('/quotes', async(req, res) => {
    const data = req.body;
    const success = await addQuote(data['author'], data['quote'], data['recipient'], data['emotion']);
    return res.json({"success": success});
});

app.get('/stats', async(req, res) => {
    const rows = await getAuthorStats();
    const statsConverted = rows?.map(row => ({
        author: row.author,
        count: Number(row.count) // Convert BigInt to Number
    }));
    return res.json(statsConverted);
});

app.get('/quotes/:author', async(req, res) => {
    const rows = await getQuotesFromAuthor(req.params.author);
    return res.json(rows);
});
