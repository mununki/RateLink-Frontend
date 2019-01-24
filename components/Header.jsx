import React from "react";
import { withApollo } from "react-apollo";
import PropTypes from "prop-types";
import { theme } from "../lib/theme";
import logout from "../lib/logout";
import Dropdown from "./Dropdown";

class Header extends React.Component {
  componentDidMount() {
    const menu = document.querySelector(".menu");
    const panelRight = document.querySelector(".panel-right");
    menu.addEventListener("click", this._showRightPanel(panelRight));
  }

  componentWillUnmount() {
    const menu = document.querySelector(".menu");
    const panelRight = document.querySelector(".panel-right");
    menu.removeEventListener("click", this._showRightPanel(panelRight));
  }

  _showRightPanel = htmlElement => () => {
    if (htmlElement.classList.contains("show")) {
      htmlElement.classList.remove("show");
    } else {
      htmlElement.classList.add("show");
    }
  };

  _closeRightPanel = () => {
    const panelRight = document.querySelector(".panel-right");
    panelRight.classList.remove("show");
  };

  render() {
    const dropdownKCItems = [
      {
        id: 1,
        icon: <i className="fas fa-chart-line" />,
        name: "운임 차트",
        link: "/charts"
      }
    ];
    const dropdownUserItems = [
      {
        id: 1,
        icon: <i className="fas fa-id-badge" />,
        name: "프로필",
        link: "/profile"
      },
      {
        id: 2,
        icon: <i className="far fa-handshake" />,
        name: "친구관리",
        link: "/friends"
      },
      {
        id: 3,
        icon: <i className="fas fa-sign-out-alt" />,
        name: "로그아웃",
        function: logout(this.props.client)
      }
    ];
    return (
      <div className="header">
        <div className="panel-left">
          <Dropdown icon={<i className="fas fa-ship" />} buttonName="운임" buttonLink="/rates" />
        </div>
        <div className="panel-right">
          <Dropdown
            icon={<i className="fas fa-globe-asia" />}
            buttonName="Knowledge Center"
            items={dropdownKCItems}
            closeRightPanel={this._closeRightPanel}
          />
          <Dropdown
            icon={<i className="fas fa-user-circle" />}
            buttonName={this.props.loggedInUser.data ? this.props.loggedInUser.data.profile.profile_name : "로그인"}
            items={dropdownUserItems}
            rightAlign={true}
            closeRightPanel={this._closeRightPanel}
          />
        </div>
        <div className="menu">
          <i className="fas fa-bars" />
        </div>
        <style jsx>
          {`
            .header {
              background-color: ${theme.LIGHT};
              box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
              position: fixed;
              width: 100%;
              display: flex;
              justify-content: space-between;
              z-index: 300;
            }
            .menu {
              display: none;
            }
            @media screen and (max-width: 576px) {
              .header {
                display: block;
              }
              .panel-right {
                display: none;
              }
              .menu {
                display: inline-block;
                position: absolute;
                top: 0;
                right: 0;
                padding: 15px;
                color: #fff;
                cursor: pointer;
                z-index: 1000;
              }
              .menu:hover {
                background-color: #eee;
                color: #000;
              }
              .show {
                display: block;
              }
            }
          `}
        </style>
      </div>
    );
  }
}

Header.propTypes = {};

export default withApollo(Header);
