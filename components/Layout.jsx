import React from "react";
import Header from "./Header";
import NProgress from "next-nprogress/component";

export default ({ children, loggedInUser }) => (
  <React.Fragment>
    <Header loggedInUser={loggedInUser} />
    <NProgress />
    {children}
    <style jsx global>
      {`
        body {
          margin: 0px;
          background-color: #eee;
        }
        .padding-global-top {
          padding-top: 5rem;
        }
      `}
    </style>
  </React.Fragment>
);
