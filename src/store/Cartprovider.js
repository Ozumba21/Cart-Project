import { useReducer } from "react";
import CartContext from "./context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, actions) => {
  if (actions.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + actions.item.price * actions.item.amount;

    const existingCartIndex = state.items.findIndex(
      (item) => item.id === actions.item.id
    );
    const existingCarItem = state.items[existingCartIndex];

    let updatedItem;
    let updatedItems;

    if (existingCarItem) {
      updatedItem = {
        ...existingCarItem,
        amount: existingCarItem.amount + actions.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartIndex] = updatedItem;
    } else {
      updatedItem = { ...actions.item };
      updatedItems = state.items.concat(updatedItem);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (actions.type === "REMOVE") {
    const existingCartIndex = state.items.findIndex(
      (item) => item.id === actions.item.id
    );
    const existingItem = state.items[existingCartIndex];
    const updatedTotalAmount = state.total.Amount - existingItem.price;

    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== actions.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
 if (actions.type === "CLEAR"){
   return defaultCartState;
 }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchAction] = useReducer(cartReducer, defaultCartState);
  const additemToCartHandler = (item) => {
    dispatchAction({ type: "ADD", item: item });
  };

  const removeItemsFromCartHandler = (id) => {
    dispatchAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () =>{
     dispatchAction({type:"CLEAR"})
  }
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: additemToCartHandler,
    removeitem: removeItemsFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
