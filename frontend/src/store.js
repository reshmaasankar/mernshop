import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./reducers/apiSlice";
import cartSliceReducer from './reducers/cartSlice'
import authSliceReducer from './reducers/authSlice'


const store = configureStore({
    reducer: {
        [apiSlice.reducerPath] : apiSlice.reducer,
        cart: cartSliceReducer,
        auth: authSliceReducer
    },
    middleware: (getDef) => getDef().concat(apiSlice.middleware),
    devTools: true
})

export default store;