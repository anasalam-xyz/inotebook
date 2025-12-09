const connectToMongo = require('./db.js');
connectToMongo();

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => res.send('Server working'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`\nApp listening on port ${port}\n`);
});
