import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { baseApi } from './baseApi';
import todosReducer from './features/todos/todosSlice';
import { rtkQueryMutationNotifier } from './middlewares/rtkQueryMutationNotifier';

const isProduction = process.env.NODE_ENV === 'production';

const rootReducer = combineReducers({
   todos: todosReducer,
   [baseApi.reducerPath]: baseApi.reducer,
});

export const makeStore = () => {
   return configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) => {
         const defaultMiddleWare = getDefaultMiddleware().concat(
            baseApi.middleware,
            rtkQueryMutationNotifier
         );

         if (process.env.NEXT_PUBLIC_REDUX_LOGGER_ON === 'ON') {
            defaultMiddleWare.push(logger);
         }

         return defaultMiddleWare;
      },
      devTools: !isProduction,
   });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
