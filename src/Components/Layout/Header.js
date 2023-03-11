import React from "react";
import images from "../../pictures/food2.jpg"
import style from "./Header.module.css"
import HeaderCartButton from "./HeaderCartButton"

const Header = (props) =>{
  return (
  <React.Fragment>
    <header className = {style.header}>
        <h1>FOODIE</h1>
        <HeaderCartButton OnVictor = {props.onShowCart}/>
    </header>
    <div className = {style["main-image"]}>
        <img src = {images} alt = "My First React"  />
    </div>

  </React.Fragment>
  );
};
export default Header; 