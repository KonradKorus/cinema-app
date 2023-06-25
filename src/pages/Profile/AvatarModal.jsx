import { Box, Button, Grid, Modal, Typography, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { deleteUser } from '../../hooks/hook'




const AvatarModal = ({OnSubmit}) => 
{
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();
    const [photo, setPhoto] = useState("")

    const onClick = (e) =>
    {
        e.preventDefault();

        OnSubmit(photo)

        setOpen(false)
    }
    return (
     <>
        <Button
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{marginTop: "10%"}}
        >
            Zmień zdjęcie
        </Button>
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            >
            <Box sx={{backgroundColor: "#272727" ,width: 500, height: 300, display: "flex", flexDirection:"column", alignItems: "center", justifyContent: "space-evenly" , position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                <Typography
                    variant="h5"
                >
                    Podaj adres url zdjęcia
                </Typography>
                <Box sx={{width: 500, display: "flex", justifyContent:"space-around", alignItems:"end" }}>
                    <TextField
                        type="text"
                        value={photo}
                        onChange={(e) => setPhoto(e.target.value)}
                    >
                    </TextField>
                    <Button 
                        variant="outlined"
                        onClick={onClick}
                        >
                        Zmień
                    </Button>
                </Box>
            </Box>
        </Modal>
      </>
    )
}

export default AvatarModal