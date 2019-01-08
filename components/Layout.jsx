import React from "react";
import Header from "./Header";
import NProgress from "next-nprogress/component";
import { ToastContainer } from "react-toastify";

export default ({ children, loggedInUser }) => (
  <React.Fragment>
    <Header loggedInUser={loggedInUser} />
    <NProgress />
    <ToastContainer />
    {children}
    <style jsx global>
      {`
        body {
          margin: 0px;
          padding: 0px;
          background-color: #eee;
          font-size: 0.9em;
        }
        .padding-global-top {
          padding-top: 5rem;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}
    </style>
  </React.Fragment>
);
