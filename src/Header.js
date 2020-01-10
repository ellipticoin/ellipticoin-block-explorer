import { Link } from 'react-router-dom'
import NetworkChooser from "./NetworkChooser";
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
      <Link to="/migrate_ether">Migrate Ether</Link>
      <a href="/">Transactions</a>
      <a href="/">Blocks</a>
      <input placeholder="Search" />
      <NetworkChooser />
    </nav>
  </header>
);

export default Header;
