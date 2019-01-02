import React from "react";
import ClickOutside from "../lib/clickOutside";
import Router from "next/router";
import { theme } from "../lib/theme";

export default class Dropdown extends React.Component {
  state = {
    isOpen: false
  };
  _toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  _open = () => {
    this.setState({
      isOpen: true
    });
  };
  _close = () => {
    this.setState({
      isOpen: false
    });
  };
  render() {
    // Props
    // ======================
    // - icon : dropdown button icon
    // - buttonName : dropdown button name
    // - buttonLink : dropdown button link in case items props not provided
    // - items : dropdown contents item {name: string(item name), link: string(path) or function: function}
    const rightAlign = this.props.rightAlign ? "0" : null;
    return (
      <React.Fragment>
        <div
          className="dropdown-container"
          onMouseEnter={this._open}
          onMouseLeave={this._close}
        >
          <ClickOutside close={this._close}>
            <div
              className="dropdown-button"
              onClick={
                this.props.items
                  ? this._toggle // items props is provided, button will work only toggle the contents
                  : this.props.buttonLink // check if buttonLink is provided or not
                  ? () => Router.push(this.props.buttonLink) // Route to buttonLink
                  : null // if buttonLink is not provided
              }
            >
              {this.props.icon} {this.props.buttonName}
            </div>
            {this.state.isOpen ? (
              <div className="dropdown-contents">
                {this.props.items &&
                  this.props.items.map((item, key) => (
                    <div
                      key={key}
                      className="dropdown-item"
                      onClick={() => {
                        if (item.link) {
                          this.props.closeRightPanel();
                          Router.push(item.link);
                        } else if (item.function) {
                          this.props.closeRightPanel();
                          item.function();
                        }
                      }}
                    >
                      {item.icon && item.icon} {item.name}
                    </div>
                  ))}
              </div>
            ) : null}
          </ClickOutside>
        </div>
        <style jsx>{`
          .dropdown-container {
            display: inline-block;
            position: relative;
            background-color: ${theme.LIGHT};
          }
          .dropdown-container:hover {
            cursor: pointer;
          }
          .dropdown-container:hover .dropdown-button {
            color: #000;
            background-color: #eee;
          }
          .dropdown-button {
            color: #fff;
            padding: 15px;
          }
          .dropdown-contents {
            display: block;
            min-width: 150px;
            position: absolute;
            color: #000;
            right: ${rightAlign};
            z-index: 10;
            background-color: #eee;
            box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
          }
          .dropdown-item {
            padding: 15px;
          }
          .dropdown-item:hover {
            color: #eee;
            background-color: ${theme.LIGHT};
          }
          @media screen and (max-width: 576px) {
            .dropdown-container {
              display: block;
            }
            .dropdown-contents {
              display: block;
              position: relative;
              right: ;
            }
          }
        `}</style>
      </React.Fragment>
    );
  }
}
