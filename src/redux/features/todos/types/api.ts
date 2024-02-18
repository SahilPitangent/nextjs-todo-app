import type { CommonResponseBody } from '@/redux/types';
import { Todo } from './common';

export type GetTodosResponseBody = CommonResponseBody<Todo[]>;
export type CreateTodoResponseBody = CommonResponseBody<Todo>;
export type EditTodoResponseBody = CommonResponseBody<Todo>;
export type DeleteTodoResponseBody = CommonResponseBody<Todo>;

export type CreateTodoQueryArgs = Pick<Todo, 'name' | 'dueDate'>;
export type UpdateTodoQueryArgs = Pick<Todo, 'id'> &
   Partial<Pick<Todo, 'name' | 'dueDate' | 'isCompleted'>>;
export type DeleteTodoQueryArgs = Pick<Todo, 'id'>;
