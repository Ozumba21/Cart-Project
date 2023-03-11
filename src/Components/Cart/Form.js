import React from "react";
import { useRef, useState } from "react";
import style from "./Form.module.css";

const willEmpty = (value) => value.trim() === "";
const isFive = (value) => value.trim().length > 5;

const Form = (props) => {
  const [formInputValidation, isSetInputFormValidation] = useState({
    name: true,
    Address: true,
    city: true,
    postalCode: true,
  });
  const nameInputRef = useRef();
  const AddressInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();
  const formHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredAddress = AddressInputRef.current.value;
    const enteredpostal = postalInputRef.current.value;
    const enteredcity = cityInputRef.current.value;


   

    const enteredNameValid = !willEmpty(enteredName);
    const enteredAddressValid = !willEmpty(enteredAddress);
    const enteredCityIsValid = !willEmpty(enteredcity);
    const enteredPostalValid = isFive(enteredpostal);


    isSetInputFormValidation({
      name:enteredNameValid,
       Address: enteredAddressValid,
       city: enteredCityIsValid,
       postalCode: enteredPostalValid,

    })

    const FormIsValid =
      enteredNameValid &&
      enteredAddressValid &&
      enteredCityIsValid &&
      enteredPostalValid;

      if(!FormIsValid){
        return;
      }
      props.OnVictor({
        name: enteredName,
        Address: enteredAddress,
        city: enteredcity,
        postalCode:enteredpostal,
      })
  };

  const control = `${style.control} ${formInputValidation.name ? "" : style.invalid }`
  const addresscontrol = `${style.control} ${formInputValidation.Address ? "" : style.invalid }`
  const citycontrol = `${style.control} ${formInputValidation.city ? "" : style.invalid }`
  const postalcontrol = `${style.control} ${formInputValidation.postalCode ? "" : style.invalid }`

  return (
    <div>
      <form className={style.form} onSubmit={formHandler}>
        <div className={control}>
          <label htmlFor="Name">Enter your Name</label>
          <input type="text" id="Name" ref={nameInputRef} />
          {!formInputValidation.name && <p>Please Enter a valid Name</p>}
        </div>
        <div className={addresscontrol}>
          <label htmlFor="Address">Enter your Address</label>
          <input type="text" id="Address" ref={AddressInputRef} />
          {!formInputValidation.Address && <p>Please Enter a valid Address</p>}
          <div className={citycontrol}>
            <label htmlFor="Postal Code">Enter your Postal Code</label>
            <input type="text" id="Postal Code" ref={postalInputRef} />
            {!formInputValidation.postalCode && <p>Please Enter a valid portalcode</p>}
          </div>
          <div className={postalcontrol}>
            <label htmlFor="City">Enter your city</label>
            <input type="text" id="City" ref={cityInputRef} />
            {!formInputValidation.city && <p>Please Enter a valid city Name</p>}
          </div>
          <div className={style.actions}>
            <button type="button" onClick={props.Oncancel}>
              Cancel
            </button>
            <button className={style.submit}>Confirm</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
