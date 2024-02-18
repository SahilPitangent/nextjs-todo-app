import { MuiDialog } from '@/components/MUI';
import { HelpOutline } from '@mui/icons-material';
import {
   Button,
   CircularProgress,
   DialogActions,
   DialogContent,
   DialogProps,
   Stack,
   Typography,
} from '@mui/material';
import { Props } from './ConfirmationDialog.types';

export default function ConfirmationDialog({
   isActionProcessing = false,
   onModalClose,
   open = false,
   title = 'Are you sure?',
}: Props) {
   const onClose: DialogProps['onClose'] = () => {
      onModalClose('canceled');
   };

   const onCancel = () => {
      onModalClose('canceled');
   };

   const onConfirm = () => {
      onModalClose('confirmed');
   };

   return (
      <MuiDialog open={open} onClose={onClose}>
         <DialogContent>
            <Stack spacing={2} alignItems="center" py={1.2}>
               <HelpOutline fontSize="large" color="action" />
               <Typography variant="h5" component="p">
                  {title}
               </Typography>
            </Stack>
         </DialogContent>
         <DialogActions>
            <Stack width="100%" spacing={1.6} direction="row" justifyContent="center">
               <Button
                  sx={{ width: 108 }}
                  color="primary"
                  variant="contained"
                  onClick={onConfirm}
                  disabled={isActionProcessing}
               >
                  {isActionProcessing && (
                     <CircularProgress sx={{ mr: 1.2 }} size={15} color="inherit" />
                  )}
                  Confirm
               </Button>
               <Button
                  color="secondary"
                  variant="contained"
                  disabled={isActionProcessing}
                  onClick={onCancel}
               >
                  Cancel
               </Button>
            </Stack>
         </DialogActions>
      </MuiDialog>
   );
}
