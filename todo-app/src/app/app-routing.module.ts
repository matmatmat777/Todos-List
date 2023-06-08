import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/todos', pathMatch: 'full' }, // Redirection vers /todos
  { path: 'todos/:id', component: TodoDetailComponent },
  { path: 'todos', component: TodoListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
