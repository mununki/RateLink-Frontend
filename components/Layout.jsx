import React from "react";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import NProgress from "next-nprogress/component";

export default ({ children, loggedInUser }) => (
  <React.Fragment>
    <ToastContainer />
    <Header loggedInUser={loggedInUser} />
    <NProgress />
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
