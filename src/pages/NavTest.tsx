import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import PetsIcon from "@mui/icons-material/Pets";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

export default function NavTest() {
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = Boolean(anchorEl);

  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      elevation={0}
      sx={{ backgroundColor: "white", marginBottom: "90px" }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyConent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: "10px, 0px",
          }}
          component="div"
        >
          /*Logo
          <Box>
            <IconButton>
              <PetsIcon sx={{ fontSize: "2.4rem" }} />
            </IconButton>
          </Box>
          /*Links
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{ marginRight: "20px", cursor: "pointer", color: "#616161" }}
            >
              Home
            </Typography>

            <Typography
              sx={{ marginRight: "20px", cursor: "pointer", color: "#616161" }}
            >
              Brand
            </Typography>

            <Typography
              sx={{ marginRight: "20px", cursor: "pointer", color: "#616161" }}
              aria-control="basic-menu"
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
              onClick={handleClick}
            >
              Categories
            </Typography>

            {/* Dropdown Items */}

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Men</MenuItem>
              <MenuItem onClick={handleClose}>Women</MenuItem>
              <MenuItem onClick={handleClose}>Phones</MenuItem>
              <MenuItem onClick={handleClose}>Accessories</MenuItem>
              <MenuItem onClick={handleClose}>Other</MenuItem>
            </Menu>

            <Typography
              sx={{ marginRight: "20px", cursor: "pointer", color: "#616161" }}
            >
              Men
            </Typography>

            <Typography
              sx={{ marginRight: "20px", cursor: "pointer", color: "#616161" }}
            >
              Women
            </Typography>

            <Typography
              sx={{ marginRight: "20px", cursor: "pointer", color: "#616161" }}
            >
              FAQ
            </Typography>
          </Box>
          /*Button
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              sx={{ backgroundColor: "#ff4081" }}
              disableElevation
              variant="contained"
            >
              Account
            </Button>

            <IconButton>
              <Badge badgeContent={4} color="primary">
                <SettingsOutlinedIcon color="action" />
              </Badge>
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
