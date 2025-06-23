import { configureStore } from '@reduxjs/toolkit';
import citizenReducer from './citizenSlice';

export default configureStore({
  reducer: {
    citizen: citizenReducer,
  },
});
