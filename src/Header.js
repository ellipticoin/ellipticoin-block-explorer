import logo from './logo.svg';
import NetworkChooser from './NetworkChooser';
import React from 'react';
const Header = () => (
  <header>
    <div>
      <img alt="logo" src={logo} />
    </div>
    <div>
      <h1>Ellipticoin</h1>
      <h2>Block Explorer</h2>
    </div>
    <nav>
      <a href="/">Transactions</a>
      <a href="/">Blocks</a>
      </nav>
      <input placeholder="Search"/>
    <nav>
      <NetworkChooser></NetworkChooser>
    </nav>
  </header>
);

export default Header;
