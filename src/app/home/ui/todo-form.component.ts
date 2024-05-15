import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateTodo, EditTodo, Todo } from '../../shared/interfaces/todo';

@Component({
  standalone: true,
  selector: 'app-todo-form',
  template: `<form [formGroup]="todoForm" (ngSubmit)="submitTodoForm()">
    <input
      type="text"
      formControlName="title"
      placeholder="title..."
      [(ngModel)]="todoEdited.title"
    />
    <input
      type="text"
      formControlName="description"
      placeholder="description..."
      [(ngModel)]="todoEdited.description"
    />
    <button type="submit" [disabled]="!todoForm.valid" value="Submit">
      {{ isEditMode ? 'Save' : 'Add' }}
    </button>
  </form>`,
  imports: [ReactiveFormsModule],
})
export class TodoFormComponent {
  @Output() todoSubmitted = new EventEmitter<CreateTodo>();
  @Output() todoSaved = new EventEmitter<Todo>();
  @Input() todoEdited: Todo = {
    id: '',
    description: '',
    title: '',
    isEdited: false,
  };
  @Input() isEditMode: boolean = false;
  private formBuilder = inject(FormBuilder);

  todoForm = this.formBuilder.nonNullable.group({
    title: ['', Validators.required],
    description: [''],
  });

  submitTodoForm() {
    this.isEditMode
      ? this.todoSaved.emit(this.todoEdited)
      : this.todoSubmitted.emit(this.todoForm.getRawValue());
  }
}
