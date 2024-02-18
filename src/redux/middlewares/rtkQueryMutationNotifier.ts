import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { isFulfilled, isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { CommonResponseBody } from '../types';

const MUTATION_REJECTED = 'api/executeMutation/rejected';
const MUTATION_FULFILLED = 'api/executeMutation/fulfilled';

export const rtkQueryMutationNotifier: Middleware = (_api: MiddlewareAPI) => (next) => (action) => {
   if (isFulfilled(action) && action?.type === MUTATION_FULFILLED) {
      const message = (action.payload as CommonResponseBody).response?.message;
      toast(message, {
         type: 'success',
      });
   }

   if (isRejectedWithValue(action) && action?.type === MUTATION_REJECTED) {
      const message = (action.payload as CommonResponseBody).error;
      toast(message, {
         type: 'error',
      });
   }

   return next(action);
};
