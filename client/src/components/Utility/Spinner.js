import React, { Fragment } from "react";
import spinner from "./spinner.gif";

const func = () => (
  <Fragment>
    <img src={spinner} style={{ width: "60px", margin: "auto", display: "block" }} alt='Loading...' />
  </Fragment>
);

export default func;
