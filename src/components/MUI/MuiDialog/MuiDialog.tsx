import { Dialog } from '@mui/material';
import { styled } from '@mui/material/styles';

const MuiDialog = styled(Dialog, {
   shouldForwardProp: (prop) => prop !== 'alignContent' && prop !== 'alignActions',
})(({ theme }) => {
   return {
      '& .MuiPaper-root': {
         width: '100%',
         maxWidth: 400,
      },

      '& .MuiDialogActions-root': {
         paddingLeft: theme.spacing(3),
         paddingRight: theme.spacing(3),
         paddingBottom: theme.spacing(1.5),
      },
   };
});

export default MuiDialog;
