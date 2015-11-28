import React from 'react';

var Header = React.createClass({
  render() {
    return (
      <header className="header">{this.props.content}</header>
    );
  }
});

export default Header;
