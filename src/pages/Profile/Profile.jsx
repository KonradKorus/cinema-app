import { Container, Typography, TextField, Box, Grid, Card, Avatar, Button, Modal } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import DeleteModal from './DeleteModal'

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"))


  const date = () =>
  {
    const toParse = user.date_of_birth;
    const elems = toParse.split('-');
    const last = elems[2].split('T');

    return last[0] + "." + elems[1] + "." + elems[0] + "r."
  }
  const phone = () =>
  {
      return "+48 " + user.phone.slice(0,3) + " " + user.phone.slice(3,6) + " " + user.phone.slice(6,9);
  }

  return (
    <Container sx = {{display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "stretch", marginLeft:"20%", marginTop:'10%', marginBottom: '10%'}}>
      <Container sx={{display:"flex"}}>
        <Grid sx={{justifyContent:"right"}}>
          <Avatar
            variant = "square" 
            sx={{width: 150, height: 150}}
            src={user.image_url}
          />
          <Box mt={'10%'}>
            <Link to="/edit-profile">
              <Button>
                Edytuj Profil
              </Button>
            </Link>
            <Link to="/change-password">
              <Button>
                Zmień hasło
              </Button>
            </Link>
          </Box>
          <DeleteModal/>
        </Grid>
        <Grid sx={{justifyContent:"space-around"}}>
          <Box sx={{display: "block", marginLeft: '5%'}}>
            <Typography sx={{fontSize: 25}}>
              {user.first_name + " " + user.last_name}
            </Typography>
          </Box>
          <Box sx={{display: "block", marginLeft: '5%'}}>
            <Typography sx={{fontSize: 25}}>
              {user.email}
            </Typography>
          </Box>
          <Box sx={{display: "block", marginLeft: '5%'}}>
            <Typography sx={{fontSize: 25}}>
              {date()}
            </Typography>
          </Box>
          <Box sx={{display: "block", marginLeft: '5%'}}>
            <Typography sx={{fontSize: 25}}>
              {phone()}
            </Typography>
          </Box>
        </Grid>
      </Container>
      <Grid>
          <Typography
            variant="h4"
            sx ={{marginTop: "2%", marginLeft: "2%"}}
          >
            Moje rezerwacje
          </Typography>
        </Grid>
    </Container>
  )
}

export default Profile