import React, { useContext } from "react";
import DataContext from "../Context/dataContext";
import { Redirect } from "react-router-dom";

export default () => {
  const context = useContext(DataContext);

  return context.user.isAuthenticated ? (
    <div style={{ paddingTop: 100 }} className="container list-group">
      {context.products.map((product) => (
        <div className="list-group-item" key={product.id}>
          {product.name} - Rs {product.price}
          {product.qty > 0 ? (
            <button
              className="btn btn-link"
              onClick={() => {
                context.updateCart(product.id);
              }}
            >
              Add
            </button>
          ) : (
            <label className="btn-danger">Sold Out</label>
          )}
        </div>
      ))}
    </div>
  ) : <Redirect to="/Login"/>;
};
