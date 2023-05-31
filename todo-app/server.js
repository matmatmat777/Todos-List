const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/todos', (req, res) => {
  const todos = [{ id: 1, title: 'faire les course', state: 'Done' }, { id: 2, title: 'mettre du carburant', state: 'Done' }, { id: 3, title: 'se rendre à la réunion', state: 'Not Done' }];
  res.json(todos);
});

app.listen(3000, () => {
  console.log('server starts on port 3000')
})
