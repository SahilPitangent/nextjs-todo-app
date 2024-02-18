import type { Dayjs } from 'dayjs';

export type CommonProps = {
   dialogOpen: boolean;
   isProcessingReq: boolean;
   closeDialog: () => void;
   onTodoFormSubmit: (_data: FormData) => void;
};

export type FormData = {
   name: string;
   dueDate: Dayjs | null;
};
