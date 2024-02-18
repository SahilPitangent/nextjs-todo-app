import { selectTodoById } from '@/redux/features/todos/todosSlice';
import { useAppSelector } from '@/redux/hooks';
import { MoreVert } from '@mui/icons-material';
import { Checkbox, Chip, IconButton, Menu, MenuItem, TableCell, TableRow } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import { MouseEventHandler, useMemo, useRef, useState } from 'react';
import type { Props } from './TodoRow.types';

export default function TodoRow({
   todoId,
   handleDeleteTodo,
   handleEditTodo,
   handleToggleCompletionStatus,
}: Props) {
   const todo = useAppSelector(selectTodoById(todoId));
   const [actionMenuOpen, setActionMenuOpen] = useState<boolean>(false);
   const actionMenuToggleRef = useRef<HTMLButtonElement | null>(null);

   const theme = useTheme();
   const expiredColor = alpha(theme.palette.error.light, 0.1);

   const isExpired = useMemo(() => {
      return todo && todo.dueDate && dayjs().isAfter(todo.dueDate);
   }, [todo]);

   const handleActionMenuCellClick: MouseEventHandler<HTMLTableCellElement> = (event) => {
      event.stopPropagation();
   };

   const closeActionMenu = () => {
      setActionMenuOpen(false);
   };

   const handleActionMenuToggleClick = () => {
      setActionMenuOpen((prevState) => !prevState);
   };

   const handleEditClick = () => {
      if (!todo) return;
      handleEditTodo(todoId);
      closeActionMenu();
   };

   const handleDeleteClick = () => {
      handleDeleteTodo(todoId);
      closeActionMenu();
   };

   const toggleStatus = () => {
      if (!todo || isExpired) return;
      handleToggleCompletionStatus(todoId, !todo.isCompleted);
   };

   return (
      <TableRow
         hover={!isExpired}
         onClick={toggleStatus}
         role="checkbox"
         sx={{ backgroundColor: isExpired ? expiredColor : '' }}
      >
         <TableCell component="th" scope="row" padding="none">
            <Checkbox
               color="primary"
               checked={todo.isCompleted}
               onChange={(event) => event.preventDefault()}
            />
            {todo.name}
         </TableCell>
         <TableCell align="center">
            {todo.isCompleted && <Chip label="Completed" color="success" size="small" />}
            {!todo.isCompleted && <Chip label="Pending" color="warning" size="small" />}
         </TableCell>
         <TableCell align="center">
            {todo.createdAt ? dayjs(todo.createdAt).format('MMM D, YYYY') : '--'}
         </TableCell>
         <TableCell align="center">
            {todo.dueDate ? dayjs(todo.dueDate).format('MMM D, YYYY') : '--'}
         </TableCell>

         <TableCell onClick={handleActionMenuCellClick} align="right">
            <IconButton
               size="small"
               ref={actionMenuToggleRef}
               onClick={handleActionMenuToggleClick}
            >
               <MoreVert />
            </IconButton>
            <Menu
               anchorEl={actionMenuToggleRef.current}
               open={actionMenuOpen}
               onClose={closeActionMenu}
            >
               {!isExpired && (
                  <MenuItem onClick={handleEditClick} disabled={todo.isCompleted}>
                     Edit
                  </MenuItem>
               )}
               <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
            </Menu>
         </TableCell>
      </TableRow>
   );
}
