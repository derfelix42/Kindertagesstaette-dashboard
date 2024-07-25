
import express from 'express';
const app = express();
const PORT = process.env.PORT || 80;

app.get('/', (req, res) => {
  res.send('Hello, Docker!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
