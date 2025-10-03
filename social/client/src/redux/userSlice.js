import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    profileData: null,
    suggestedUsers:null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },

    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
     setSuggestedUsers:(state,action)=>{
        state.suggestedUsers=action.payload
       },

    clearUserData: (state) => {
      state.userData = null;
      state.profileData = null;
      state.isLoading = false;
    },
  },
});

export const { setUserData, setProfileData , clearUserData , setSuggestedUsers} = userSlice.actions;
export default userSlice.reducer;
