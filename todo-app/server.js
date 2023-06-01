const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); // Ajout du middleware pour prendre en charge les requêtes JSON

let todos = [
  { id: 1, title: 'faire les courses', done: false, description: 'écrire ici la description du todo' },
  { id: 2, title: 'mettre du carburant', done: false, description: 'écrire ici la description du todo' },
  { id: 3, title: 'se rendre à la réunion', done: false, description: 'écrire ici la description du todo' }
];

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.get('/todos/:id', (req, res) => {
  const todoId = req.params.id;

  // Recherche du todo correspondant dans la liste des todos
  const todo = todos.find(todo => todo.id === parseInt(todoId));

  // Vérification si le todo existe
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  // Envoi du todo en réponse
  res.json(todo);
});

app.put('/todos/:id', (req, res) => {
  const todoId = req.params.id;
  const updatedTodo = req.body;

  // Recherche de la tâche correspondante dans la liste des todos
  const todoIndex = todos.findIndex(todo => todo.id === parseInt(todoId));

  // Vérification si la tâche existe
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  // Mise à jour de l'état de la tâche
  todos[todoIndex].done = updatedTodo.done;

  // Envoi de la tâche mise à jour en réponse
  res.json(todos[todoIndex]);
});


app.listen(3000, () => {
  console.log('server starts on port 3000');
});
