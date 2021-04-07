

import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers/dataSlice';

export default configureStore({
  reducer: {
    data: reducer,
  },
});