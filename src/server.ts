const express = require('express');
const { routes } = require('./routes');
import cors from 'cors'
import path from 'node:path';

const app = express();

app.use(cors())
app.use(express.json());
app.use(routes);
app.use('/uploadImovelImage', express.static(path.resolve(__dirname, '..', 'tmp', 'imovelImage')));

app.listen(3000, () => {
  console.log('Server online on port 3000');
})