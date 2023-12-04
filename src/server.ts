const express = require('express');
const { routes } = require('./routes');
import cors from 'cors'

const app = express();

app.use(cors())
app.use(express.json());
app.use(routes);

app.listen(3000, () => {
  console.log('Server online on port 3000');
})