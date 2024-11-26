import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { SetStateAction, useState } from "react";
import PetsIcon from "@mui/icons-material/Pets";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);

  const openMenu = Boolean(anchorEl);
  const openSettingsMenu = Boolean(anchorEl2);

  let navigate = useNavigate();
  // const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  // const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { animaltype } = event.currentTarget.dataset;
    if (animaltype == "All") {
      navigate("/");
    } else {
      navigate("/?animalValue=" + animaltype);
    }
    setAnchorEl(null);
  };

  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleCloseSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { settingsitem } = event.currentTarget.dataset;
    if (settingsitem == "Org") {
      navigate("/Organization");
    } else if (settingsitem == "Sports") {
      navigate("/Sport");
    } else {
      navigate("/Title");
    }
    setAnchorEl2(null);
  };

  return (
    <AppBar sx={{ marginBottom: "90px" }}>
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: "10px,0px",
          }}
          component="div"
        >
          <Box>
            <IconButton>
              <PetsIcon sx={{ fontsize: "2.4rem" }} />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "left",
            }}
          >
            <Typography
              sx={{ marginRight: "20px", cursor: "pointer" }}
              aria-control="animal-menu"
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
              onClick={handleClick}
            >
              Animals
            </Typography>
            <Menu
              id="animal-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem data-animalType={"All"} onClick={handleClose}>
                All
              </MenuItem>
              <MenuItem data-animalType={"Dog"} onClick={handleClose}>
                Dogs
              </MenuItem>
              <MenuItem data-animalType={"Cat"} onClick={handleClose}>
                Cats
              </MenuItem>
              <MenuItem data-animalType={"Other"} onClick={handleClose}>
                Other
              </MenuItem>
            </Menu>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              aria-control="settings-menu"
              aria-haspopup="true"
              aria-expanded={openSettingsMenu ? "true" : undefined}
              onClick={handleClick2}
            >
              <SettingsOutlinedIcon />
            </IconButton>
            <Menu
              id="settings-menu"
              anchorEl={anchorEl2}
              open={openSettingsMenu}
              onClose={handleCloseSettings}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem data-settingsitem={"Org"} onClick={handleCloseSettings}>
                Organizations
              </MenuItem>
              <MenuItem
                data-settingsitem={"Sports"}
                onClick={handleCloseSettings}
              >
                Sports
              </MenuItem>
              <MenuItem
                data-settingsitem={"Titles"}
                onClick={handleCloseSettings}
              >
                Titles
              </MenuItem>
              <MenuItem
                data-settingsitem={"Example"}
                onClick={handleCloseSettings}
              >
                Example
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
