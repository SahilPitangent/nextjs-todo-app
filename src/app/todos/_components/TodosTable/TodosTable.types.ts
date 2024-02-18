import type { Props as TodoRowProps } from '../TodoRow/TodoRow.types';

export type Props = Pick<
   TodoRowProps,
   'handleDeleteTodo' | 'handleEditTodo' | 'handleToggleCompletionStatus'
>;
