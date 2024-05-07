import middleware from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';
import { Database } from '@blocklet/sdk';

const db = new Database('demo.db');

const router = Router();

// const db = new Datastore({ filename: './db/profiles.db', autoload: true });

router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));

router.get('/profile', (_req, res) => {
  db.findOne({}, (err, doc) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(doc || {});
    }
  });
});

// Update profile
router.put('/profile', (req, res) => {
  const { username, email, phone } = req.body;
  const profile = { username, email, phone };

  db.update({}, profile, { upsert: true }, (err) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(profile);
    }
  });
});

export default router;
