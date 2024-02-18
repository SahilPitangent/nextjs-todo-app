import { selectTodoIds } from '@/redux/features/todos/todosSlice';
import { useAppSelector } from '@/redux/hooks';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TodoRow from '../TodoRow/TodoRow';
import { Props } from './TodosTable.types';

export default function TodosTable({
   handleDeleteTodo,
   handleEditTodo,
   handleToggleCompletionStatus,
}: Props) {
   const todoIds = useAppSelector(selectTodoIds);

   return (
      <Box sx={{ width: '100%' }}>
         <Paper sx={{ width: '100%', mb: 2 }}>
            <TableContainer sx={{ height: 400 }}>
               <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                  <TableHead>
                     <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="center">Completion Status</TableCell>
                        <TableCell align="center">Created At</TableCell>
                        <TableCell align="center">Due date</TableCell>
                        <TableCell align="right">Actions</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {todoIds.map((id) => {
                        return (
                           <TodoRow
                              key={id}
                              todoId={id}
                              handleDeleteTodo={handleDeleteTodo}
                              handleEditTodo={handleEditTodo}
                              handleToggleCompletionStatus={handleToggleCompletionStatus}
                           />
                        );
                     })}
                  </TableBody>
               </Table>
            </TableContainer>
         </Paper>
      </Box>
   );
}
