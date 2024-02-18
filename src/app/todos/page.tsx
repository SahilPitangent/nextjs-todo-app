'use client';

import {
   useCreateTodoMutation,
   useDeleteTodoMutation,
   useEditTodoMutation,
   useLazyGetTodosQuery,
} from '@/redux/features/todos/todosApi';
import { selectTodoTotal } from '@/redux/features/todos/todosSlice';
import { UpdateTodoQueryArgs } from '@/redux/features/todos/types/api';
import { useAppSelector } from '@/redux/hooks';
import { Add } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import {
   ConfirmationDialog,
   ConfirmationDialogProps,
   TodoCreateForm,
   TodoEditForm,
   TodosTable,
   type TodoFormProps,
   type TodosTableProps,
} from './_components';

type TodoActionDialogState = {
   open: boolean;
   todoId: string;
};

export default function TodosPage() {
   const [fetchTodos, { isFetching: isFetchingTodos, isUninitialized: isTodosUninitialized }] =
      useLazyGetTodosQuery();
   const [createTodo, { isLoading: isCreatingTodo }] = useCreateTodoMutation();
   const [editTodo, { isLoading: isEditingTodo }] = useEditTodoMutation();
   const [deleteTodo, { isLoading: isDeletingTodo }] = useDeleteTodoMutation();

   const todoTotal = useAppSelector(selectTodoTotal);

   const [addTodoDialogOpen, setAddTodoDialogOpen] = useState<boolean>(false);
   const [editTodoDialogState, setEditTodoDialogState] = useState<TodoActionDialogState>({
      open: false,
      todoId: '',
   });
   const [deleteTodoDialogState, setDeleteTodoDialogState] = useState<TodoActionDialogState>({
      open: false,
      todoId: '',
   });

   const theme = useTheme();

   const handleDeleteTodo: TodosTableProps['handleDeleteTodo'] = (todoId) => {
      if (deleteTodoDialogState.todoId || isDeletingTodo) return;

      setDeleteTodoDialogState({
         open: true,
         todoId,
      });
   };

   const handleEditTodo: TodosTableProps['handleEditTodo'] = (todoId) => {
      if (editTodoDialogState.todoId || isEditingTodo) return;

      setEditTodoDialogState({
         open: true,
         todoId,
      });
   };

   const handleToggleCompletionStatus: TodosTableProps['handleToggleCompletionStatus'] = (
      todoId,
      isCompleted
   ) => {
      const payload: UpdateTodoQueryArgs = {
         id: todoId,
         isCompleted: isCompleted,
      };

      editTodo(payload);
   };

   const onTodoCreateSubmit: TodoFormProps['onTodoFormSubmit'] = async (data) => {
      if (isCreatingTodo) return;

      const payload = {
         name: data.name,
         dueDate: data.dueDate?.toISOString() ?? null,
      };

      const createRes = await createTodo(payload);

      if ('error' in createRes) return;

      setAddTodoDialogOpen(false);
   };

   const onTodoEditSubmit: TodoFormProps['onTodoFormSubmit'] = async (data) => {
      if (isEditingTodo) return;

      const payload: UpdateTodoQueryArgs = {
         id: editTodoDialogState.todoId,
         name: data.name,
         dueDate: data.dueDate?.toISOString() ?? null,
      };

      const editRes = await editTodo(payload);

      if ('error' in editRes) return;

      closeEditTodoDialog();
   };

   const handleDeleteConfirmationDialogClose: ConfirmationDialogProps['onModalClose'] = async (
      action
   ) => {
      if (action === 'confirmed') {
         await deleteTodo({ id: deleteTodoDialogState.todoId });
      }

      setDeleteTodoDialogState({
         open: false,
         todoId: '',
      });
   };

   const closeAddTodoDialog = () => {
      setAddTodoDialogOpen(false);
   };

   const closeEditTodoDialog = () => {
      setEditTodoDialogState({
         open: false,
         todoId: '',
      });
   };

   useEffect(() => {
      fetchTodos();
   }, [fetchTodos]);

   return (
      <>
         <Stack direction="row" justifyContent="space-between" mb={3}>
            <Typography component="h1" variant="h1" fontWeight={theme.typography.fontWeightMedium}>
               ToDo List
            </Typography>

            <Button onClick={() => setAddTodoDialogOpen(true)} variant="contained" color="primary">
               <Add />
               Add todo
            </Button>
         </Stack>
         {addTodoDialogOpen && (
            <TodoCreateForm
               isProcessingReq={isCreatingTodo}
               dialogOpen={addTodoDialogOpen}
               closeDialog={closeAddTodoDialog}
               onTodoFormSubmit={onTodoCreateSubmit}
            />
         )}
         {editTodoDialogState.open && (
            <TodoEditForm
               isProcessingReq={isEditingTodo}
               dialogOpen={editTodoDialogState.open}
               closeDialog={closeEditTodoDialog}
               onTodoFormSubmit={onTodoEditSubmit}
               todoId={editTodoDialogState.todoId}
            />
         )}
         {deleteTodoDialogState.open && (
            <ConfirmationDialog
               open={deleteTodoDialogState.open}
               onModalClose={handleDeleteConfirmationDialogClose}
               title="Are you sure you want to delete?"
               isActionProcessing={isDeletingTodo}
            />
         )}
         {(isFetchingTodos || isTodosUninitialized) && (
            <ListStatusMessage message="Loading Todos, Please Wait..." />
         )}
         {!todoTotal && !isFetchingTodos && !isTodosUninitialized && (
            <ListStatusMessage message="No todos found" />
         )}
         {!!todoTotal && (
            <TodosTable
               handleDeleteTodo={handleDeleteTodo}
               handleEditTodo={handleEditTodo}
               handleToggleCompletionStatus={handleToggleCompletionStatus}
            />
         )}
      </>
   );
}

function ListStatusMessage({ message }: { message: string }) {
   return (
      <Typography variant="subtitle1" color="text.secondary" p={4} mx="auto" textAlign="center">
         {message}
      </Typography>
   );
}
