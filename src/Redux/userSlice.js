import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    password:"",
    email: "",
    plan:""
}

 const userSlice = createSlice ({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            const {password, username, email, plan} = action.payload;
            state.password = password;
            state.username = username;
            state.email = email;
            state.plan = plan;
        },
        changeUserData: (state, action) => {
            const {password, username, email, plan} = action.payload;
            state.password = password;
            state.username = username;
            state.email = email;
            state.plan = plan;
        },
    }
})

export const {addUser, changeUserData} = userSlice.actions;
export default userSlice.reducer;