import NProgress from "next-nprogress/component";
import React from "react";
import { ToastContainer } from "react-toastify";
import Header from "./Header";

export default ({ children, loggedInUser }) => (
  <React.Fragment>
    <Header loggedInUser={loggedInUser} />
    <NProgress />
    <ToastContainer />
    {children}
    <style jsx global>
      {`
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
        .height-full-align-middle {
          height: 100vh;
          display: flex;
          align-items: center;
        }
        @media screen and (max-width: 576px) {
          .height-full-align-middle {
            height: 100vh;
            display: flex;
            align-items: start;
            padding-top: 70px;
          }
        }
      `}
    </style>
  </React.Fragment>
);
