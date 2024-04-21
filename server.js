import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static('./dist/'));

app.listen(PORT, function () {
  console.log(`Yo ${PORT}!`);
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist', 'index.html'));
});

// import express from 'express';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const PORT = process.env.PORT || 3000;

// const app = express();

// app.use(express.static(path.join(__dirname, './dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './dist', 'index.html'));
// });

// app.listen(PORT, () => {
//   console.log(`Мой текст в логе после запуска ${PORT}!`);
// });
