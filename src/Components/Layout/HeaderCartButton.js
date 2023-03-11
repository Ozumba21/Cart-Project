import React from "react";
import { useContext } from "react";
import CartContext from "../../store/context";
import style from "./HeaderCartButton.module.css"
import { FaCartPlus } from "react-icons/fa";

const HeaderCartButton = (props) => {
  const cartCxt = useContext(CartContext);

  const numberOfCartItems = cartCxt.items.reduce((curNumber, item) => {
    return curNumber + item.amount
  }, 0)

  return (
    <button className={style.button} onClick = {props.OnVictor}>
      <span className={style.icon}>
        <FaCartPlus size = "1.3rem"  />
        
      </span>
      <span>Your Cart</span>
      <span className={style.badge}>{numberOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;


