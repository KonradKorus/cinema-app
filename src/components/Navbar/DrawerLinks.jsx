import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

const isAdmin = true; //mock data

const DrawerLinks = () => {
  const navItems = {
    home: 'Strona główna',
    repertoire: 'Repertuar',
    contact: 'Kontakt',
  };
  if (isAdmin) {
    navItems['admin-panel'] = 'Panel administratora';
  }

  return (
    <List>
      {Object.keys(navItems).map((key, index) => {
        return (
          <ListItem key={index} disablePadding>
            {key === 'contact' ? (
              <ScrollLink
                to="contact"
                smooth={true}
                duration={500}
                spy={true}
                style={{ display: 'inline-block', width: '100%' }}
              >
                <ListItemButton sx={{ textAlign: 'center', color: '#fff' }}>
                  <ListItemText primary={navItems[key]} />
                </ListItemButton>
              </ScrollLink>
            ) : (
              <NavLink
                to={key}
                style={{ display: 'inline-block', width: '100%' }}
              >
                <ListItemButton sx={{ textAlign: 'center', color: '#fff' }}>
                  <ListItemText primary={navItems[key]} />
                </ListItemButton>
              </NavLink>
            )}
          </ListItem>
        );
      })}
    </List>
  );
};

export default DrawerLinks;
