import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent  implements OnInit{
  todos: Todo[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getTodos();
  }
  getTodos(): void {
    this.http.get<Todo[]>('http://localhost:3000/todos')
      .subscribe((todos) => {
        this.todos = todos;
      });
  }
}
