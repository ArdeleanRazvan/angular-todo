import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateTodo, EditTodo, Todo } from '../../shared/interfaces/todo';

@Component({
  standalone: true,
  selector: 'app-todo-form',
  template: `<form
    class=" flex w-96 flex-col justify-center justify-items-center gap-2"
    [formGroup]="todoForm"
    (ngSubmit)="submitTodoForm()"
  >
    <p class="my-10 text-center text-3xl font-bold">
      {{ isEditMode ? 'Edit Todo' : 'New Todo' }}
    </p>
    <input
      class="input input-bordered mx-2 text-sm focus-within:border-blue-600 focus-within:outline-blue-600"
      type="text"
      formControlName="title"
      placeholder="title..."
      [(ngModel)]="todoEdited.title"
    />
    <textarea
      class="textarea textarea-bordered mx-2 focus-within:border-blue-600 focus-within:outline-blue-600"
      type="text"
      formControlName="description"
      placeholder="description..."
      [(ngModel)]="todoEdited.description"
    ></textarea>
    <button
      class="btn m-2 bg-gradient-to-br from-violet-700 to-pink-600 text-lg font-bold text-white antialiased disabled:text-white disabled:opacity-40"
      type="submit"
      [disabled]="!todoForm.valid"
      value="Submit"
    >
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
