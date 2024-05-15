import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../shared/data-access/todo.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { TodoFormComponent } from '../home/ui/todo-form.component';
@Component({
  standalone: true,
  selector: 'app-todo-detail',
  template: `<h2>Detail</h2>
    @if(todo();as todo){ @if(todo.isEdited){
    <app-todo-form
      [isEditMode]="true"
      [todoEdited]="todo"
      (todoSaved)="todoService.saveTodo($event)"
    />
    }@else{
    <h2>{{ todo.title }}</h2>
    <p>{{ todo.description }}</p>
    <button (click)="todoService.editTodo({ id: todo.id })">Edit</button>
    }} @else {
    <p>Could not find todo...</p>

    }`,
  imports: [TodoFormComponent],
})
export default class TodoDetailComponent {
  private route = inject(ActivatedRoute);
  public todoService = inject(TodoService);

  private paramMap = toSignal(this.route.paramMap);

  todo = computed(() =>
    this.todoService
      .todos()
      .find((todo) => todo.id === this.paramMap()?.get('id'))
  );
}
