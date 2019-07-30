import NetworkChooser from './NetworkChooser';
import React from 'react';
const Header = () => (
  <header>
    <div className="header">
      <h1>Ellipticoin</h1>
      <h2>Block Explorer</h2>
    </div>
    <nav>
      <a href="/">Transactions</a>
      <a href="/">Blocks</a>
      <input placeholder="Search"/>
      <NetworkChooser></NetworkChooser>
    </nav>
  </header>
);

export default Header;
