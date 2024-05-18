import { Component, inject } from '@angular/core';
import { TodoFormComponent } from './ui/todo-form.component';
import { TodoService } from '../shared/data-access/todo.service';
import { TodoListComponent } from './ui/todo-list.component';

@Component({
  standalone: true,
  selector: 'app-home',
  template: `
    <div class="my-6 flex justify-center">
      <div
        class="inline-flex flex-col rounded-xl bg-gradient-to-br from-blue-400 via-blue-700 to-indigo-600"
      >
        <app-todo-form
          class="mx-1 mt-1 flex rounded-t-lg bg-slate-100"
          (todoSubmitted)="todoService.addTodo($event)"
        />
        <div class="h-0.5 divide-x divide-red-600"></div>
        <app-todo-list
          class="mx-1 mb-1 flex rounded-b-lg bg-slate-100"
          [todos]="todoService.todos()"
          (delete)="todoService.deleteTodo($event)"
        />
      </div>
    </div>
  `,
  imports: [TodoFormComponent, TodoListComponent],
})
export default class HomeComponent {
  todoService = inject(TodoService);
}
