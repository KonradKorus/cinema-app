import React from 'react';
import { Box, Button } from '@mui/material';
import { NavLink, Link } from 'react-router-dom';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const isAdmin = false; //mock data
const isLogged = false; //mock data

const NavbarLinks = () => {
  return (
    <>
      <Box
        sx={{
          mt: 0.4,
          width: '100%',
          display: 'flex',
          justifyContent: { xs: 'end', sm: 'end', md: 'space-between' },
        }}
      >
        <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
          <NavLink
            className={'activeNavbar'}
            to="/"
            style={{ display: 'inline-block', marginRight: 5 }}
          >
            <Button
              sx={{
                color: '#fff',
                px: 1,
              }}
            >
              Strona główna
            </Button>
          </NavLink>
          <NavLink
            className={'activeNavbar'}
            to="/repertoire"
            style={{ display: 'inline-block', marginRight: 5 }}
          >
            <Button
              sx={{
                color: '#fff',
                px: 1,
              }}
            >
              Repertuar
            </Button>
          </NavLink>

          <ScrollLink
            to="contact"
            smooth={true}
            duration={500}
            spy={true}
            className={'activeNavbar'}
            style={{ display: 'inline-block', marginRight: 5 }}
          >
            <Button sx={{ color: '#fff', px: 1 }}>Kontakt</Button>
          </ScrollLink>

          {isLogged && isAdmin && (
            <NavLink
              className={'activeNavbar'}
              to="/admin-panel"
              style={{ display: 'inline-block' }}
            >
              <Button sx={{ color: '#fff', px: 1 }}>
                Panel Administratora
              </Button>
            </NavLink>
          )}
        </Box>
        <Box>
          {!isLogged ? (
            <>
              <Link to="/login" style={{ display: 'inline-block' }}>
                <Button
                  variant="outlined"
                  sx={{
                    color: '#fff',
                    bgcolor: '#36262C',
                    mr: 2,
                  }}
                  startIcon={<LoginIcon />}
                >
                  Logowanie
                </Button>
              </Link>

              <Link
                className={'activeNavbar'}
                to="/register"
                style={{ display: 'inline-block' }}
              >
                <Button
                  startIcon={<AppRegistrationIcon />}
                  sx={{ color: '#fff' }}
                >
                  Rejestracja
                </Button>
              </Link>
            </>
          ) : (
            <>
              <NavLink
                className={'activeNavbar'}
                to="/profile"
                style={{ display: 'inline-block', marginRight: 5 }}
              >
                <Button
                  sx={{ color: '#fff', px: 2 }}
                  startIcon={<PersonIcon />}
                >
                  user123
                </Button>
              </NavLink>

              <Link to="/logout" style={{ display: 'inline-block' }}>
                <Button
                  startIcon={<LogoutIcon />}
                  variant="outlined"
                  sx={{ color: '#fff', bgcolor: '#36262C' }}
                >
                  Wyloguj się
                </Button>
              </Link>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default NavbarLinks;
