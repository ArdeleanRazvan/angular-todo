import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeleteTodo, Todo } from '../../shared/interfaces/todo';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-todo-list',
  template: `<ul
    class="my-9 flex w-full flex-col gap-2 text-lg font-semibold text-white"
  >
    @for (todo of todos; track todo.id) {
      <li
        class="mx-2 flex h-12 items-center justify-between rounded-lg bg-gradient-to-br from-violet-700 to-pink-600 text-center"
      >
        <a class="ml-3" routerLink="/detail/{{ todo.id }}">{{ todo.title }}</a>
        <button class="mx-3" (click)="delete.emit({ id: todo.id })">
          Delete
        </button>
      </li>
    } @empty {
      <li>Nothing to do!</li>
    }
  </ul>`,

  imports: [RouterLink],
})
export class TodoListComponent {
  @Input({ required: true }) todos!: Todo[];
  @Output() delete = new EventEmitter<DeleteTodo>();
}
