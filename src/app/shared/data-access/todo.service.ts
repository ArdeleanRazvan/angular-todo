import { Injectable, signal } from '@angular/core';
import { CreateTodo, DeleteTodo, EditTodo, Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  #todos = signal<Todo[]>([
    {
      id: '1',
      title: 'Todo #1',
      description: 'Todo #1 Description',
      isEdited: false,
    },
    {
      id: '2',
      title: 'Todo #2',
      description: 'Todo #2 Description',
      isEdited: false,
    },
    {
      id: '3',
      title: 'Todo #3',
      description: 'Todo #3 Description',
      isEdited: false,
    },
    {
      id: '3',
      title: 'Todo #4',
      description: 'Todo #4 Description',
      isEdited: false,
    },
  ]);
  todos = this.#todos.asReadonly();

  addTodo(todo: CreateTodo) {
    this.#todos.update((todos) => [
      ...todos,
      { ...todo, id: Date.now().toString(), isEdited: false },
    ]);
  }

  deleteTodo(todoToDelete: DeleteTodo) {
    this.#todos.update((todos) =>
      todos.filter((todo) => todo.id != todoToDelete.id)
    );
  }

  editTodo(todoToEdit: EditTodo) {
    this.#todos.update((todos) =>
      todos.map((todo) =>
        todo.id === todoToEdit.id ? { ...todo, isEdited: true } : todo
      )
    );
  }

  saveTodo(saveData: Todo) {
    this.#todos.update((todos) =>
      todos.map((todo) =>
        todo.id === saveData.id
          ? {
              ...todo,
              description: saveData.description,
              title: saveData.title,
              isEdited: false,
            }
          : todo
      )
    );
  }
}
