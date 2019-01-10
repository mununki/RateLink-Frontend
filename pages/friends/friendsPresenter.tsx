import React from "react";
import ShowerAndReader from "../../components/friends/ShowerAndReader";
import FindUsers from "../../components/friends/FindUsers";

const FriendsPresenter = ({ loggedInUser, showers, readers }) => {
  return (
    <div className="padding-global-top">
      <FindUsers />
      <ShowerAndReader
        showers={showers}
        readers={readers}
        loggedInUser={loggedInUser}
      />
    </div>
  );
};

export default FriendsPresenter;
