
import express from 'express';
const app = express();
const PORT = 80;

app.use(express.static('static'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});