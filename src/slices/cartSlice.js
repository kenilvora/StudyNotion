import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

const initialState = {
  cart: Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : [],
  total: Cookies.get("total") ? JSON.parse(Cookies.get("total")) : 0,
  totalItems: Cookies.get("totalItems") ? JSON.parse(Cookies.get("totalItems")) : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const course = action.payload;
      const index = state.cart.findIndex((item) => item._id === course._id);

      if (index >= 0) {
        // If the course is already in the cart, do not modify the quantity
        toast.error("Course already in the cart");
        return;
      }
      // If the course is not in the cart, add it to the cart
      state.cart.push(course);
      // Update the total quantity and price
      state.totalItems++;
      state.total += course.price;
      // Update to localstorage
      Cookies.set("cart", JSON.stringify(state.cart));
      Cookies.set("total", JSON.stringify(state.total));
      Cookies.set("totalItems", JSON.stringify(state.totalItems));
      // show toast
      toast.success("Course added to cart");
    },
    removeFromCart: (state, action) => {
      const courseId = action.payload;
      const index = state.cart.findIndex((item) => item._id === courseId);

      if (index >= 0) {
        // If the course is found in the cart, remove it
        state.totalItems--;
        state.total -= state.cart[index].price;
        state.cart.splice(index, 1);
        // Update to localstorage
        Cookies.set("cart", JSON.stringify(state.cart));
        Cookies.set("total", JSON.stringify(state.total));
        Cookies.set("totalItems", JSON.stringify(state.totalItems));
        // show toast
        toast.success("Course removed from cart");
      }
    },
    resetCart: (state) => {
      state.cart = [];
      state.total = 0;
      state.totalItems = 0;
      // Update to localstorage
      localStorage.removeItem("cart");
      localStorage.removeItem("total");
      localStorage.removeItem("totalItems");
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
