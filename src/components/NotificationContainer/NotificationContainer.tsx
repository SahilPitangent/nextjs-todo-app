import { Slide, ToastContainer } from 'react-toastify';

export default function NotificationContainer() {
   return (
      <ToastContainer
         autoClose={2500}
         position="top-right"
         newestOnTop={true}
         draggable={false}
         closeOnClick={false}
         transition={Slide}
      />
   );
}
