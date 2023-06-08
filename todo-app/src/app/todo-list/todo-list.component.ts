import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: Todo = {
      title: '',
      description: '',
      done: false,
      id: 0
  };

  constructor(private todoService: TodoService, private router: Router) { }


  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  updateTodoState(event: any, todo: Todo): void {
    const checked = event.target.checked;
    todo.done = checked;
    this.todoService.updateTodoState(todo).subscribe(updatedTodo => {
      if (updatedTodo.done) {
        this.todos = this.todos.filter(item => item.id !== updatedTodo.id); // Retirer la tâche de la liste
        this.todos.push(updatedTodo); // Ajouter la tâche en bas de la liste
      }
    });
  }

  addNewTodo(): void {
    if (this.newTodo.title.trim() !== '') {
      this.todoService.addTodo(this.newTodo).subscribe(addedTodo => {
        this.todos.unshift(addedTodo);
        this.newTodo = {
          id:0,
          title: '',
          description: '',
          done: false
        };
      });
    }
  }

  goToTodoDetail(todo: Todo): void {
    const todoId = todo.id;
    this.router.navigate(['/todos', todoId]);
  }
  deleteTodo(todo: Todo): void {
    this.todoService.deleteTodo(todo.id).subscribe(() => {
      this.todos = this.todos.filter(item => item.id !== todo.id);
    });
  }
}
