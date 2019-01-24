import React from "react";

export default class ClickOutside extends React.Component {
  componentDidMount() {
    document.addEventListener("click", this._handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this._handleClickOutside);
  }

  _handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.close(this.props.target);
    }
  };

  render() {
    return <div ref={node => (this.wrapperRef = node)}>{this.props.children}</div>;
  }
}
