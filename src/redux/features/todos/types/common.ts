import type { Todo as PrismaTodo } from '@prisma/client';

export type Todo = Pick<PrismaTodo, 'id' | 'name' | 'isCompleted'> & {
   createdAt: string;
   dueDate: string | null;
};
