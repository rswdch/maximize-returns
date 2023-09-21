import express from 'express';
import * as dotenv from 'dotenv';
import * as path from 'path';

// ES6 compatibility for __dirname
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure environment variables
dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;

const app = express();

// Middleware
app.use(express.json());
// app.use(express.urlencoded());

// Serve static client files
app.use(express.static(path.resolve(__dirname, '../../dist/client/')))

// Routes

/**
 * 404 handler
 */
app.use('*', (req,res) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, ()=>{ console.log(`Listening on port ${PORT}...`); });
