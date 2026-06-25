import { createSlice } from "@reduxjs/toolkit";

const addDecimal = (val) =>{
    return (Math.round(val *100) / 100).toFixed(2)
}

const updateState = (state) => {
    state.itemsPrice = addDecimal(state.cartItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0))
    state.shippingPrice = addDecimal(state.itemsPrice > 100 || state.itemsPrice === '0.00'  ? 0 : 10);
    state.taxPrice = addDecimal(Number(0.15 * state.itemsPrice).toFixed(2));
    state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);

    localStorage.setItem('cart', JSON.stringify(state));

    return state;
}
const initialState = localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')): {cartItems: [], shippingAddress: {}, paymentMethod: 'payPal'};
const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart : (state, action) => {
            const item = action.payload;
            const existingItem = state.cartItems.find(d => d._id === item._id);

            if(existingItem){
                state.cartItems = state.cartItems.map(d=> d._id === existingItem._id ? item :d);
            }else{
                state.cartItems = [...state.cartItems, item];
            }
            return updateState(state);
        },

        removeFromCart : (state, action) => {
            state.cartItems = state.cartItems.filter(d => d._id !== action.payload);
            return updateState(state);
        },

        saveShippingAddress :(state, action) =>{
            state.shippingAddress = action.payload;
            return updateState(state);
        },

        savePaymentMethod : (state, action) => {
            state.paymentMethod = action.payload;
            return updateState(state);
        },

        clearCartItems: (state, action) => {
            state.cartItems = [];
            return updateState(state)
        }
    }
});

export const {addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems } = cartSlice.actions;
export default cartSlice.reducer;