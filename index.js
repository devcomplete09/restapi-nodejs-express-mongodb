const express = require('express');
const app = express();
const dbClientPromise = require('./db');

const PORT = process.env.PORT || 5001;
app.use(express.json());

app.get('/users', async (req, res) => {
  const db = await dbClientPromise;
  const users = await db.collection('users').find().toArray();

  res.json(users);
});

app.get('/users/:id', async (req, res) => {
  const emailId = req.params.id;

  const db = await dbClientPromise;
  const user = await db.collection('users').findOne({
    email: emailId.toLowerCase().trim()
  }, { projection: { _id: 0 }});

  res.json(user);
});

app.post('/users', async (req, res) => {
  const db = await dbClientPromise;

  const newUser = {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age
  };

  await db.collection('users').insertOne(newUser);
  res.json({ status: 'ok' });
});

app.put('/users', async (req, res) => {
  const email = req.body.email;
  const newName = req.body.name;

  const db = await dbClientPromise;

  await db.collection('users').updateOne({
    email
  }, {
    $set: {
      name: newName
    }
  });

  res.json({ status: 'ok' });
});

app.delete('/users/:id', async (req, res) => {
  const emailId = req.params.id;
  const db = await dbClientPromise;

  await db.collection('users').deleteOne({
    email: emailId.toLowerCase().trim()
  });

  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});