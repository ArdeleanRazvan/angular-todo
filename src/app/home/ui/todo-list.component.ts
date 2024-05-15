import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeleteTodo, Todo } from '../../shared/interfaces/todo';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-todo-list',
  template: `<ul>
    @for (todo of todos; track todo.id) {
    <li>
      <a routerLink="/detail/{{ todo.id }}">{{ todo.title }}</a>
      <button (click)="delete.emit({ id: todo.id })">Delete</button>
    </li>
    }@empty {
    <li>Nothing to do!</li>
    }
  </ul>`,
  styleUrl: 'todo-list.component.scss',
  imports: [RouterLink],
})
export class TodoListComponent {
  @Input({ required: true }) todos!: Todo[];
  @Output() delete = new EventEmitter<DeleteTodo>();
}
