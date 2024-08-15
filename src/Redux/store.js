import  {configureStore} from '@reduxjs/toolkit';
import userReducer from "./userSlice";
import clientReducer from "../Redux/clientSlice"
import errorReducer from './errorSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        client: clientReducer,
        error: errorReducer,
    }
})