import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../shared/data-access/todo.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { TodoFormComponent } from '../home/ui/todo-form.component';
@Component({
  standalone: true,
  selector: 'app-todo-detail',
  template: ` <div class="my-6 flex justify-center">
    <div
      class="inline-flex flex-col rounded-xl bg-gradient-to-br from-blue-400 via-blue-700 to-indigo-600"
    >
      @if (todo(); as todo) {
        @if (todo.isEdited) {
          <app-todo-form
            class="mx-1 my-1 flex rounded-lg bg-slate-100"
            [isEditMode]="true"
            [todoEdited]="todo"
            (todoSaved)="todoService.saveTodo($event)"
          />
        } @else {
          <div class="m-1 flex w-96 flex-col rounded-lg bg-slate-100">
            <p class="my-10 text-center text-3xl font-bold">
              {{ todo.title }}
            </p>
            <div class="h-0.5 divide-x bg-blue-600"></div>
            <p class="mx-2 my-2 text-pretty">{{ todo.description }}</p>
            <div class="h-0.5 divide-x bg-blue-600"></div>
            <button
              class="btn m-2 bg-gradient-to-br from-blue-400 via-blue-700 to-indigo-600 text-lg font-bold text-white antialiased disabled:text-white disabled:opacity-40"
              (click)="todoService.editTodo({ id: todo.id })"
            >
              Edit
            </button>
          </div>
        }
      } @else {
        <p>Could not find todo...</p>
      }
    </div>
  </div>`,
  imports: [TodoFormComponent],
})
export default class TodoDetailComponent {
  private route = inject(ActivatedRoute);
  public todoService = inject(TodoService);

  private paramMap = toSignal(this.route.paramMap);

  todo = computed(() =>
    this.todoService
      .todos()
      .find((todo) => todo.id === this.paramMap()?.get('id')),
  );
}
