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

  constructor(private todoService: TodoService,) { }

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
        this.todos.push(updatedTodo);
      }
    });
  }
}
