import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;
console.log(PORT);
const app = express();
app.use(express.json());
// app.use(express.urlencoded());

app.get('/',(req, res) => {
  res.send('Hello World');
});

/**
 * 404 handler
 */
app.use('*', (req,res) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, ()=>{ console.log(`Listening on port ${PORT}...`); });

