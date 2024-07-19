import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  totalItems: localStorage.getItem("totalItems")
    ? localStorage.getItem("totalItems")
    : 0,
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  totalPrice: localStorage.getItem("totalPrice")
    ? JSON.parse(localStorage.getItem("totalPrice"))
    : 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //add to cart
    addToCart: (state, action) => {
      const course = action.payload;
      const index = state.cartItems.findIndex(
        (item) => item._id === course._id
      );

      if (index >= 0) {
        toast.error("course already in cart");
        return;
      }

      state.cartItems.push(course);
      state.totalItems++;
      state.totalPrice += course.price;

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));

      toast.success("Course added to cart");
    },
    removeItem: (state, action) => {
      const courseId = action.payload;
      const index = state.cartItems.findIndex((item) => item.id === courseId);

      if (index >= 0) {
        state.totalItems--;
        state.totalPrice -= state.cartItems[index].price;
        state.cartItems.splice(index, 1);

        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
        localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));

        toast.success("Course added to cart");
      }
    },
    resetCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
      state.totalPrice = 0;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
    },
  },
});

export const { addItem, removeItem, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
