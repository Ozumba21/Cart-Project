import React from "react";
import ReactDOM from "react-dom";
import style from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={style.backdrop} onClose= {props.onClose}></div>;
};
const ModalOverlay = (props) => {
  return (
    <div className={style.modal}>
      <div className={style.content}>{props.children}</div>
    </div>
  );
};

const portal = document.getElementById("overlays");

const Modal = (props) => {
   return(
  <React.Fragment>
    {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />,portal)}
    {ReactDOM.createPortal(
      <ModalOverlay>{props.children}</ModalOverlay>,
      portal
    )}
  </React.Fragment>
   );
};

export default Modal;
