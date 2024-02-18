export type ModalAction = 'canceled' | 'confirmed';

export type Props = {
   isActionProcessing?: boolean;
   onModalClose: (_confirmation: ModalAction) => void;
   open: boolean;
   title?: string;
};
