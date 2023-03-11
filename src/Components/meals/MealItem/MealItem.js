import { useContext } from "react";
import React from "react";
import style from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/context";

const MealItem = (props) => {
  const CartCtx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  const AddCartHandler = (amount) => {
    CartCtx.addItem({
      key: props.id,
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };
  return (
    <li className={style.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={style.description}>{props.description}</div>
        <div className={style.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddCart={AddCartHandler} />
      </div>
    </li>
  );
};
export default MealItem;
