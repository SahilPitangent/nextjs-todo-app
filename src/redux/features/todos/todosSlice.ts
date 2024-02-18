import { RootState } from '@/redux/store';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { todosApiEndpoints } from './todosApi';
import { Todo } from './types/common';

const todosAdapter = createEntityAdapter<Todo>({
   sortComparer: (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
});

const initialState = todosAdapter.getInitialState();

const todosSlice = createSlice({
   name: 'todos',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addMatcher(todosApiEndpoints.getTodos.matchFulfilled, (state, action) => {
         const todos = action.payload.response?.data;
         if (todos) todosAdapter.setMany(state, todos);
      });
      builder.addMatcher(todosApiEndpoints.createTodo.matchFulfilled, (state, action) => {
         const todo = action.payload.response?.data;
         if (todo) todosAdapter.addOne(state, todo);
      });
      builder.addMatcher(todosApiEndpoints.editTodo.matchFulfilled, (state, action) => {
         const todo = action.payload.response?.data;
         if (todo) todosAdapter.updateOne(state, { id: todo.id, changes: todo });
      });
      builder.addMatcher(todosApiEndpoints.deleteTodo.matchFulfilled, (state, action) => {
         const todo = action.payload.response?.data;
         if (todo) todosAdapter.removeOne(state, todo.id);
      });
   },
});

export const {
   selectIds: selectTodoIds,
   selectEntities: selectTodoEntities,
   selectAll: selectTodoAll,
   selectTotal: selectTodoTotal,
   selectById,
} = todosAdapter.getSelectors((state: RootState) => state.todos);

export const selectTodoById = (id: string) => (state: RootState) => selectById(state, id);

export default todosSlice.reducer;
