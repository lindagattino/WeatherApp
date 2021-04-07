

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers/showsSlice';

export default configureStore({
  reducer: {
    shows: counterReducer,
  },
});