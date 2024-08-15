import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    adress:"",
    phone:"",
    email: "",
    dni:"",
    location:"",
    date:"",
}

 const clientSlice = createSlice ({
    name: "client",
    initialState,
    reducers: {
        addClient: (state, action) => {
            const {name, adress, phone, email, dni, location,date } = action.payload;
            state.name = name;
            state.adress = adress;
            state.phone = phone;
            state.email = email;
            state.dni = dni;
            state.location = location;
            state.date = date;
        },
        changeUserData: (state, action) => {
            const {password, username, mail} = action.payload;
            state.password = password;
            state.username = username;
            state.email = mail;
        },
    }
})

export const {addClient, changeUserData} = clientSlice.actions;
export default clientSlice.reducer;