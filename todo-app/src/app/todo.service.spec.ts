import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TodoService } from './todo.service';
import { Todo } from './todo.model';

describe('TodoService', () => {
  let todoService: TodoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService]
    });

    todoService = TestBed.inject(TodoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(todoService).toBeTruthy();
  });

  it('should retrieve todos', () => {
    const mockTodos: Todo[] = [
      { id: 1, title: 'Todo 1', done: false, description: 'Todo 1 description' },
      { id: 2, title: 'Todo 2', done: false, description: 'Todo 2 description' }
    ];

    todoService.getTodos().subscribe(todos => {
      expect(todos).toEqual(mockTodos);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/todos');
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos);
  });

  it('should update todo state', () => {
    const todoId = 1;
    const updatedTodo: Todo = { id: todoId, title: 'Todo 1', done: true, description: 'Todo 1 description' };

    todoService.updateTodoState(updatedTodo).subscribe(todo => {
      expect(todo).toEqual(updatedTodo);
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/todos/${todoId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedTodo);
  });

  it('should add a new todo', () => {
    const newTodo: Todo = { id: 3, title: 'New Todo', done: false, description: 'New Todo description' };

    todoService.addTodo(newTodo).subscribe(todo => {
      expect(todo).toEqual(newTodo);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/todos');
    expect(req.request.method).toBe('POST');
    req.flush(newTodo);
  });
});
