import React, { useContext } from "react";
import DataContext from "../Context/dataContext";
import {Redirect} from "react-router-dom";

export default () => {
  const context = useContext(DataContext);

  return context.user.isAuthenticated ? (
    <div style={{ paddingTop: 100 }} className="container">
      <table className="table table-hover table-condensed">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {context.cart.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.qty * product.price}</td>
              <td>
                <button
                  onClick={() => {
                    context.addProductQty(product.id);
                  }}
                >
                  +
                </button>
                <input type="text" value={product.qty} onChange={() => {}} />
                <button
                  onClick={() => {
                    context.removeProductQty(product.id);
                  }}
                >
                  -
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) :  <Redirect to="/Login"/>;
};
