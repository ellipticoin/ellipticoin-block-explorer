import React from "react";
const Header = () => (
  <header>
    <a href="/">
      <div className="header">
        <h1>Ellipticoin</h1>
        <h2>Block Explorer</h2>
      </div>
    </a>
    <nav>
      <a href="/">Transactions</a>
      <a href="/">Blocks</a>
      <input placeholder="Search" />
    </nav>
  </header>
);

export default Header;
