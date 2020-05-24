import React, { useState } from "react";
import "./App.css";
import Header from "./Common/Header";
import Footer from "./Common/Footer";
import DataContext from "./Context/dataContext";
import productList from "./Utils/ProductData";
import user from "./Utils/UserData";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Product from "./Components/Product";
import Cart from "./Components/Cart";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [productState, setProductState] = useState(productList);
  const [cartState, setCartState] = useState([]);
  const [userState, setUserState] = useState(user);

  const addProductQty = (productId) => {
    const productItem = productState.find((a) => a.id === productId);
    if (productItem.qty > 0) {
      setCartState(
        cartState.map((cartItem) => {
          return cartItem.id === productId
            ? { ...cartItem, qty: cartItem.qty + 1 }
            : { ...cartItem };
        })
      );
      setProductState(
        productState.map((product) => {
          return product.id === productId
            ? { ...product, qty: product.qty - 1 }
            : { ...product };
        })
      );
    }
  };

  const removeProductQty = (productId) => {
    const cartItem = cartState.find((a) => a.id === productId);
    if (cartItem.qty - 1 > 0) {
      setCartState(
        cartState.map((item) => {
          return item.id === productId
            ? { ...item, qty: item.qty - 1 }
            : { ...item };
        })
      );
    } else {
      setCartState(
        cartState.filter((cartItem) => {
          return cartItem.id !== productId;
        })
      );
    }

    setProductState(
      productState.map((product) => {
        return product.id === productId
          ? { ...product, qty: product.qty + 1 }
          : { ...product };
      })
    );
  };

  const updateCart = (productId) => {
    const productItem = productState.find((a) => a.id === productId);
    if (productItem.qty > 0) {
      const cartItem = cartState.find((a) => a.id === productId);

      setCartState(
        cartItem
          ? cartState.map((item) => {
              return item.id === productId
                ? { ...item, qty: item.qty + 1 }
                : { ...item };
            })
          : [...cartState, { ...productItem, qty: 1 }]
      );
      setProductState(
        productState.map((product) => {
          return product.id === productId
            ? { ...product, qty: product.qty - 1 }
            : { ...product };
        })
      );
    }
  };

  const setUserDetails = (details) => {
    setUserState({
      isAuthenticated: details.isAuthenticated,
      authToken: details.authToken,
    });
  };

  return (
    <div>
      <DataContext.Provider
        value={{
          products: productState,
          cart: cartState,
          user: userState,
          addProductQty: addProductQty,
          removeProductQty: removeProductQty,
          updateCart: updateCart,
          setUserDetails: setUserDetails,
        }}
      >
        <Router>
          <Header />
          <Footer />
          <Switch>
            <Route path="/Register" component={Register} exact/>
            <Route path="/Product" component={Product} exact/>
            <Route path="/Cart" component={Cart} exact/>
            <Route path="/Login" component={Login} exact/>
          </Switch>
        </Router>
      </DataContext.Provider>
    </div>
  );
}

export default App;
