import React from 'react'

import styles from './input.module.scss'

function Input({label, type, id, disabled, onChange, value, required}) {
  return (
    <div className={styles.input}>
     <label htmlFor="" className={styles.input__title}>{label}</label>
     <input type={type} name="" id={id} disabled={disabled} className={styles.input__field} onChange={onChange} value={value} required={required}/>
    </div>
  )
}

export default Input