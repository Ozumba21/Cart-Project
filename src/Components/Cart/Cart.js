import { Fragment, useContext, useState } from "react";

import CartContext from "../../store/context";
import CartItem from "./cartItems";
import Form from "./Form";
import style from "./Cart.module.css";
import Modal from "../UI/Modal";

const Cart = (props) => {
  const [checkingOut, ischecking] = useState(false);
  const[submitting, setIssubmiting] = useState(false)
  const[DidSubmitted, setIsDidmitted] = useState(false)
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHAndler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  function orderHandler() {
    ischecking(true);
  }

  async function submitHandler(userAdd) {
    setIssubmiting(true)
    fetch("https://victor-34532-default-rtdb.firebaseio.com/victor.json", {
      method: "POST",
      body: JSON.stringify({
        user: userAdd,
        orderItems: cartCtx.items,
      }),
    });
    setIssubmiting(false)
    setIsDidmitted(true)
    cartCtx.clearCart()
  }


  const CartItems = (
    <ul className={style["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHAndler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const chinedu = (
    <div className={style.actions}>
      <button className={style["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={style.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModal = <Fragment>
      {CartItems}

<div className={style.total}>
  <span>Total Amount</span>

  <span>{totalAmount}</span>
</div>
{checkingOut && (
  <Form OnVictor={submitHandler} Oncancel={props.onClose} />
)}
{!checkingOut && chinedu}
  
  </Fragment>
  const isSubmitted = <p>Sending error data...</p>

  const didSubmittedContent = <div>
    <p>Successfully sent the order</p>
    <div className={style.actions}>
      <button className={style.button} onClick={props.onClose}>
        Close
      </button>
    
  </div> 
  </div>
  return (
    <Modal onClose={props.onClose}>
       {!submitting && !DidSubmitted && cartModal}
       {submitting && isSubmitted}
       {!submitting && DidSubmitted && didSubmittedContent}
    </Modal>
  );
};
export default Cart;
