import { baseApi } from '@/redux/baseApi';
import type {
   CreateTodoQueryArgs,
   CreateTodoResponseBody,
   DeleteTodoQueryArgs,
   DeleteTodoResponseBody,
   EditTodoResponseBody,
   GetTodosResponseBody,
   UpdateTodoQueryArgs,
} from './types/api';

const todosApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      getTodos: builder.query<GetTodosResponseBody, void>({
         query: () => 'todos/api',
      }),
      createTodo: builder.mutation<CreateTodoResponseBody, CreateTodoQueryArgs>({
         query: (body) => ({
            url: 'todos/api',
            method: 'POST',
            body: body,
         }),
      }),
      editTodo: builder.mutation<EditTodoResponseBody, UpdateTodoQueryArgs>({
         query: (body) => ({
            url: 'todos/api',
            method: 'PATCH',
            body: body,
         }),
      }),
      deleteTodo: builder.mutation<DeleteTodoResponseBody, DeleteTodoQueryArgs>({
         query: (body) => ({
            url: `todos/api`,
            method: 'DELETE',
            body,
         }),
      }),
   }),
});

export const {
   useLazyGetTodosQuery,
   useCreateTodoMutation,
   useEditTodoMutation,
   useDeleteTodoMutation,
   endpoints: todosApiEndpoints,
} = todosApi;
