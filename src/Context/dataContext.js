import React from "react";

let state = {
  products: [],
  cart: [],
  user: {},
  setUserDetails: details => {},
  updateCart: productId => {},
  addProductQty: productId => {},
  removeProductQty: productId => {}
};

export default React.createContext(state);
