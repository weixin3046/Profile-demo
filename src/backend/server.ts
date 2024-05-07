import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import Datastore from 'nedb';

const app = express();
const port = 5000;

app.use(bodyParser.json());

const db = new Datastore({ filename: './db/profiles.db', autoload: true });

// Fetch profile
app.get('/api/profile', (_req, res: Response) => {
  db.findOne({}, (err, doc) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(doc || {});
    }
  });
});

// Update profile
app.put('/api/profile', (req: Request, res: Response) => {
  const { username, email, phone } = req.body;
  const profile = { username, email, phone };

  db.update({}, profile, { upsert: true }, (err, _numReplaced: number, _upsert: boolean) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(profile);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
