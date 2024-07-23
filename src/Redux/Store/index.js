import {configureStore} from '@reduxjs/toolkit';
import BookReducers from '../Reducers/BookReducers';
export default configureStore({
  reducer: {
    listBook: BookReducers,
  },
});
