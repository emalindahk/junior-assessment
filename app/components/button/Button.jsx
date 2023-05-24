'use client'
import React from "react";

import styles from "./button.module.scss";

function Button({ children, primary, onClick, deleteBtn}) {
  return (
    <button
      id={deleteBtn && 'delete-product-btn'}
      className={
      styles.btn + ` 
      ${primary ? styles.btn__primary : styles.btn__secondary}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
