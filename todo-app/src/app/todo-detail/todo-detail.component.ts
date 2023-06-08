import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {
  todo: Todo | undefined;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log(id);
      this.todoService.getTodoById(id).subscribe(todo => {
        this.todo = todo;
      });
    });
  }

  goBackToList(): void {
    this.router.navigate(['/todos']);
  }
  }


