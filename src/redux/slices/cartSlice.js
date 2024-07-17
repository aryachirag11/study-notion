import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalItems: localStorage.getItem("totalItems")
    ? localStorage.getItem("totalItems")
    : 5,
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    settotalItems: (state, action) => {
      state.totalItems = 5;
    },
    //add to cart
    addItem: (state, action) => {
      state.cartItems.push(action.payload);
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    //remove from cart
    resetCart: (state) => {
      state.cartItems.splice(0, state.cartItems.length);
    },
    //resetCart
  },
});

export const { settotalItems, addItem, removeItem, resetCart } =
  cartSlice.actions;

export default cartSlice.reducer;
