import React, { Fragment, useState } from "react";
import "./MainNavigation.css";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "./Backdrop";

export default function MainNavigation(props) {
  const [drawerIsOpen, toggleSideDrawer] = useState(false);
  function turnDrawerOpen() {
    toggleSideDrawer(true);
  }
  const turnDrawerClose = () => {
    toggleSideDrawer(false);
  };
  return (
    <Fragment>
      {drawerIsOpen ? <Backdrop onClick={turnDrawerClose}></Backdrop> : null}

      <SideDrawer show={drawerIsOpen} onClick={turnDrawerClose}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks/>
        </nav>
      </SideDrawer>

      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={turnDrawerOpen}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h2 className="main-navigation__title">YourPlaces</h2>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </Fragment>
  );
}
