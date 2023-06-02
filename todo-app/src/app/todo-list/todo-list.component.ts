import { Component, OnInit } from '@angular/core';
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

  constructor(private todoService: TodoService) { }

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
        this.todos = this.todos.filter(item => item !== updatedTodo);
        this.todos.unshift(updatedTodo);
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
}
