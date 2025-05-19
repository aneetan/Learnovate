import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    },
})

export const {login, logout} = userSlice.actions;  //actions are functions that return an action object
export const selectUser = (state) => state.user.user;  //state for global state
export default userSlice.reducer;  