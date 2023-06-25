import { Box, Button, Grid, Modal, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { deleteUser } from '../../hooks/hook'




const DeleteModal = () => 
{
    const [del, setDel] = useState(false)
    const {setIsLogged} = useAuth();
    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate();

    const onClick = async(e) =>
    {
        e.preventDefault();

        const res = await deleteUser(user, user.id)
        .catch((e) => 
        {
            alert(e.message);
        })

        if(typeof(res) == "undefined")
        {
            return;
        }

        setIsLogged(false)
        localStorage.removeItem("user")
        localStorage.removeItem("token")

        navigate("/home")
    }
    return (
     <>
        <Button
            variant="contained"
            onClick={() => setDel(true)}
        >
            Usun konto
        </Button>
        <Modal
            open={del}
            onClose={() => setDel(false)}
            >
            <Box sx={{backgroundColor: "#272727" ,width: 500, height: 300, display: "flex", flexDirection:"column", alignItems: "center", justifyContent: "space-evenly" , position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                <Typography
                    variant="h5"
                >
                    Czy na pewno chcesz usunąć to konto?
                </Typography>
                <Box sx={{display: "flex", flexDirection:"column" , alignItems:"center", justifyContent: "center"}}>
                    <Typography>
                        Wszystkie dane powiązane z tym kontem
                    </Typography>
                    <Typography>
                        zostaną utracone
                    </Typography>
                </Box>
                <Box sx={{width: 500, display: "flex", justifyContent:"space-around", alignItems:"end" }}>
                    <Button
                        variant="contained"
                        onClick={onClick}
                        >
                        Usuń konto
                    </Button>
                    <Button 
                        variant="outlined"
                        onClick={() => setDel(false)}
                        >
                        Anuluj
                    </Button>
                </Box>
            </Box>
        </Modal>
      </>
    )
}

export default DeleteModal