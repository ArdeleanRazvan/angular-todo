export interface Todo {
  id: string;
  title: string;
  description: string;
  isEdited: boolean;
}
export type CreateTodo = Omit<Todo, 'id' | 'isEdited'>;
export type DeleteTodo = Omit<Todo, 'title' | 'description' | 'isEdited'>;
export type EditTodo = Omit<Todo, 'title' | 'description' | 'isEdited'>;
