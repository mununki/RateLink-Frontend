import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import ClickOutside from "../lib/clickOutside";
import { theme } from "../lib/theme";

export default class Dropdown extends React.Component {
  state = {
    isOpen: false
  };

  _toggle = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
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
    const { buttonLink, rightAlign, icon, items, buttonName, closeRightPanel } = this.props;
    const { isOpen } = this.state;
    return (
      <React.Fragment>
        {buttonLink ? (
          <Link href={`${buttonLink}`}>
            <a tabIndex={-1}>
              <div className="dropdown-container" onMouseEnter={this._open} onMouseLeave={this._close}>
                <div className="dropdown-button">
                  {icon} {buttonName}
                </div>
              </div>
            </a>
          </Link>
        ) : (
          <div className="dropdown-container" onMouseEnter={this._open} onMouseLeave={this._close}>
            <ClickOutside close={this._close}>
              <div
                role="button"
                className="dropdown-button"
                tabIndex={-1}
                onClick={
                  items
                    ? this._toggle // items props is provided, button will work only toggle the contents
                    : null // if buttonLink is not provided
                }
                onKeyPress={items ? this._toggle : null}
              >
                {icon} {buttonName}
              </div>
              {isOpen ? (
                <div className="dropdown-contents">
                  {items &&
                    items.map(item =>
                      item.link ? (
                        <Link key={item.id} href={`${item.link}`}>
                          <a tabIndex={-1}>
                            <div className="dropdown-item">
                              {item.icon && item.icon} {item.name}
                            </div>
                          </a>
                        </Link>
                      ) : (
                        <div
                          key={item.id}
                          role="button"
                          tabIndex={-1}
                          className="dropdown-item"
                          onClick={() => {
                            if (item.function) {
                              closeRightPanel();
                              item.function();
                            }
                          }}
                          onKeyPress={() => {
                            if (item.function) {
                              closeRightPanel();
                              item.function();
                            }
                          }}
                        >
                          {item.icon && item.icon} {item.name}
                        </div>
                      )
                    )}
                </div>
              ) : null}
            </ClickOutside>
          </div>
        )}
        <style jsx>
          {`
            a {
              text-decoration: none;
            }
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
              right: ${rightAlign ? "0" : null};
              z-index: 10;
              background-color: #eee;
              box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
            }
            .dropdown-item {
              color: #000;
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
          `}
        </style>
      </React.Fragment>
    );
  }
}

Dropdown.propTypes = {
  buttonLink: PropTypes.string,
  rightAlign: PropTypes.bool,
  icon: PropTypes.element.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      icon: PropTypes.element,
      name: PropTypes.string,
      link: PropTypes.string,
      function: PropTypes.func
    })
  ),
  buttonName: PropTypes.string.isRequired,
  closeRightPanel: PropTypes.func
};

// Dropdown.defaultProps = {
//   buttonLink: "/",
//   rightAlign: false,
//   items: [
//     {
//       id: 1,
//       icon: <i className="fas fa-ship" />,
//       link: "/",
//       function: () => {}
//     }
//   ],
//   closeRightPanel: () => {
//     const panelRight = document.querySelector(".panel-right");
//     panelRight.classList.remove("show");
//   }
// };
