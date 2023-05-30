import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NavbarLinks from './NavbarLinks';
import DrawerLinks from './DrawerLinks';

const drawerWidth = 240;

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography
        color="primary"
        variant="h6"
        sx={{ my: 2, fontWeight: 'bold' }}
      >
        Cinema name
      </Typography>
      <Divider />
      <DrawerLinks />
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{ px: { xs: 0, sm: 0, md: 0, lg: '5%', xl: '10%' } }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" style={{ mr: 2 }}>
            <Typography
              color="primary"
              variant="h5"
              component="div"
              sx={{
                fontWeight: 'bold',
                minWidth: 170,
                flexGrow: 1,
                display: { xs: 'none', sm: 'none', md: 'block' },
                '&:hover': {
                  backgroundColor: '#36262C;',
                },
              }}
            >
              Cinema name
            </Typography>
          </Link>
          <NavbarLinks />
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
