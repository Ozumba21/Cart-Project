import React, {useState} from "react";
import Header from "./Components/Layout/Header";
import Meals from "./Components/meals/Meal"
import Cart from "./Components/Cart/Cart"
import CartProvider from "./store/Cartprovider";
import "./App.css";

function App() {

  const[showCart, setShowCart] = useState(false)

  const ShowHandler = () => {
     setShowCart(true)
  }
  const hideHandler = () =>{
      setShowCart(false)
  }
  return (
    <CartProvider>
      {showCart && <Cart onClose = {hideHandler} />}
      <Header onShowCart = {ShowHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
