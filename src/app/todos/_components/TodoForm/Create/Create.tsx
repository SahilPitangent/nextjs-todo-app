'use client';

import { MuiDialog } from '@/components/MUI';
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
import type { CommonProps, FormData } from '../types';

const today = dayjs();

export default function TodoForm({
   dialogOpen,
   closeDialog,
   onTodoFormSubmit,
   isProcessingReq,
}: CommonProps) {
   const {
      handleSubmit,
      register,
      control,
      formState: { errors },
   } = useForm<FormData>({
      defaultValues: {
         name: '',
         dueDate: null,
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
            <Button
               sx={{ width: 108 }}
               type="submit"
               variant="contained"
               form="todo-form"
               disabled={isProcessingReq}
            >
               {isProcessingReq && <CircularProgress sx={{ mr: 1.2 }} size={15} color="inherit" />}
               Create
            </Button>
            <Button
               type="button"
               color="secondary"
               variant="contained"
               onClick={closeDialog}
               disabled={isProcessingReq}
            >
               Cancel
            </Button>
         </DialogActions>
      </MuiDialog>
   );
}
