import {configureStore} from '@reduxjs/toolkit'
import userSlice from './userSlice.js'
import postSlice from './postSlice.js'

 const store = configureStore({
  reducer: {
    // Add your reducers here
    user: userSlice,
    post: postSlice,
  },
});

export default store;


