export type Props = {
   todoId: string;
   handleDeleteTodo: (_id: string) => void;
   handleEditTodo: (_id: string) => void;
   handleToggleCompletionStatus: (_id: string, _isCompleted: boolean) => void;
};
