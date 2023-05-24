import React from "react";

import { header } from "./header.module.scss";

function index({ label, children }) {
  return (
    <div className={header}>
      <h2>{label}</h2>
      <div>{children}</div>
    </div>
  );
}

export default index;
