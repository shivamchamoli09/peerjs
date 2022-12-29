import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { getCurrentUser, logoutUser } from "../core/services/user.service";
import { useRouter } from "next/router";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

export default function Header() {
  const router = useRouter();

  function handleLogout() {
    logoutUser();
    router?.replace("/");
  }

  return (
    <Box sx={{ flexGrow: 1, position: "sticky", top: 0, zIndex: 9 }}>
      <AppBar position="static" sx={{}}>
        <Toolbar>
          {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
          <Box ml="auto" sx={{ display: "flex" }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {getCurrentUser()?.name}
            </Typography>
            <PersonOutlineIcon />
          </Box>
          <Button
            sx={{ ml: 5 }}
            color="inherit"
            variant="outlined"
            onClick={handleLogout}
          >
            Logout
          </Button>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
