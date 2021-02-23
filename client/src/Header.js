import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export const Header = () => {

  return (
    <div >
      <AppBar elevation={0} color="white" position="static">
        <Toolbar>
          <IconButton edge="start" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <img className="nav-logo" src="https://www.kyzen.com/download/logo/logo_H_400x148_96dpi.jpg" alt="KYZEN-logo" />
        </Toolbar>
      </AppBar>
    </div>
  );
}