const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); // Ajout du middleware pour prendre en charge les requêtes JSON

let todos = [
  { id: 1, title: 'faire les courses', done: false, description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?' },
  { id: 2, title: 'mettre du carburant', done: false, description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?' },
  { id: 3, title: 'se rendre à la réunion', done: false, description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?' }
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

app.post('/todos', (req, res) => {
  const newTodo = req.body;

  // Génération d'un nouvel ID pour le todo
  const newTodoId = todos.length + 1;

  // Création du nouvel objet todo
  const todo = {
    id: newTodoId,
    title: newTodo.title,
    done: false,
    description: newTodo.description
  };

  // Ajout du nouvel todo à la liste des todos
  todos.unshift(todo);

  // Envoi du nouvel todo en réponse
  res.status(201).json(todo);
});
app.delete('/todos/:id', (req, res) => {
  const todoId = req.params.id;

  // Recherche du todo correspondant dans la liste des todos
  const todoIndex = todos.findIndex(todo => todo.id === parseInt(todoId));

  // Vérification si le todo existe
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  // Suppression du todo de la liste des todos
  todos.splice(todoIndex, 1);

  // Envoi de la réponse avec succès
  res.sendStatus(204);
});


app.listen(3000, () => {
  console.log('server starts on port 3000');
});
