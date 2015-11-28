import React from 'react';

var Footer = React.createClass({
  render() {
    return (
      <footer className="footer">{this.props.content}</footer>
    );
  }
});

export default Footer;
