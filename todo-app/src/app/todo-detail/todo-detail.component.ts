import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {
  todo: Todo | undefined;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    const todoId = this.route.snapshot.paramMap.get('id');
    console.log(todoId);
    if (todoId) {
      this.todoService.getTodoById(parseInt(todoId)).subscribe(todo => {
        this.todo = todo;
      });
    }
  }
}

