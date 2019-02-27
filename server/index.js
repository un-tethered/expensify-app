import path from 'path';
import express from 'express';

const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const { PORT: port = 8080 } = process.env;

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => console.log(`Server started on port ${port}`));