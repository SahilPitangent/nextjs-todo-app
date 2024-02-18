'use client';

import { MuiDialog } from '@/components/MUI';
import { selectTodoById } from '@/redux/features/todos/todosSlice';
import { useAppSelector } from '@/redux/hooks';
import {
   Button,
   CircularProgress,
   DialogActions,
   DialogContent,
   DialogTitle,
   FormGroup,
   InputLabel,
   Stack,
   TextField,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { fieldConstraints } from '../formHelper';
import type { FormData } from '../types';
import type { Props } from './Edit.types';

const today = dayjs();

export default function TodoForm({
   dialogOpen,
   closeDialog,
   onTodoFormSubmit,
   todoId,
   isProcessingReq,
}: Props) {
   const todo = useAppSelector(selectTodoById(todoId as string));
   const defaultDueDate = todo?.dueDate ? dayjs(todo.dueDate) : null;

   const {
      handleSubmit,
      register,
      control,
      formState: { errors },
   } = useForm<FormData>({
      defaultValues: {
         name: todo?.name ?? '',
         dueDate: defaultDueDate,
      },
   });

   const onFormSubmit: SubmitHandler<FormData> = (data) => {
      onTodoFormSubmit(data);
   };

   return (
      <MuiDialog open={dialogOpen} onClose={closeDialog}>
         <DialogTitle>Add Todo Item</DialogTitle>
         <DialogContent>
            <form id="todo-form" onSubmit={handleSubmit(onFormSubmit)} noValidate>
               <Stack spacing={2}>
                  <FormGroup>
                     <InputLabel htmlFor="todo-name">Todo name</InputLabel>
                     <TextField
                        id="todo-name"
                        type="text"
                        placeholder="Enter todo name"
                        required
                        {...register('name', fieldConstraints.name)}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                     />
                  </FormGroup>
                  <FormGroup>
                     <InputLabel>Due date (Optional)</InputLabel>
                     <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller
                           name="dueDate"
                           control={control}
                           render={({ field }) => <DatePicker {...field} minDate={today} />}
                        />
                     </LocalizationProvider>
                  </FormGroup>
               </Stack>
            </form>
         </DialogContent>
         <DialogActions>
            <Button type="submit" variant="contained" form="todo-form" disabled={isProcessingReq}>
               {isProcessingReq && <CircularProgress />}
               Update
            </Button>
            <Button type="button" color="secondary" variant="contained" onClick={closeDialog}>
               Cancel
            </Button>
         </DialogActions>
      </MuiDialog>
   );
}
