import { Container, Typography, TextField, Box, Grid, Avatar, Button } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { editUser } from '../../hooks/hook'
import AvatarModal from './AvatarModal'

const EditProfile = () => {
    const user = JSON.parse(localStorage.getItem("user"))

    const navigate = useNavigate()

    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [date, setDate] = useState("")
    const [phone, setPhone] = useState("")
    const [avatar, setAvatar] = useState("")

    useEffect((e) => 
    {
        setFname(user.first_name);
        setLname(user.last_name);
        setEmail(user.email);
        setDate(user.date_of_birth.split("T")[0])
        setPhone(user.phone)
        setAvatar(user.image_url)
    }, [])

    const onSubmit = async(e) => 
    {
        e.preventDefault()

        const edit = 
        {
            first_name: fname,
            last_name: lname,
            date_of_birth: date + "T" + user.date_of_birth.split("T")[1],
            email: email,
            phone: phone,
            image_url: avatar
        }

        console.log(edit)

        const res = await editUser(edit, user.id)
        .catch((e) => 
        {
            alert(e.message)
            setFname("")
            setLname("")
            setDate("")
            setEmail("")
            setPhone("")
            setAvatar("")
            return;
        })

        localStorage.setItem("user", JSON.stringify(res))
        navigate("/profile")
    }


    return (
            <Container sx={{display:"flex", justifyContent: "space-evenly", alignItems:"center" ,marginTop:'10%', marginBottom: '10%'}}>
                <form style={{display: "flex", width:500, justifyContent:"stretch"}} onSubmit={onSubmit}>
                    <Grid sx={{justifyContent:"right"}}>
                        <Avatar
                        variant = "square" 
                        sx={{width: 150, height: 150}}
                        src={avatar}
                        />
                        <AvatarModal OnSubmit={setAvatar}/>
                    </Grid>
                    <Grid sx={{display:"block", justifyContent:"stretch", marginLeft: '10%'}}>
                        <Box sx={{display:"flex"}}>
                            <Box sx={{display: "block", marginLeft: '5%'}}>
                                <Typography
                                    variant='subtitle'
                                    >
                                    Imie
                                </Typography>
                                <TextField
                                    value={fname}
                                    onChange={(e) => setFname(e.target.value)}
                                    type="text" 
                                />
                            </Box>
                            <Box sx={{display: "block", marginLeft: '5%'}}>
                                <Typography
                                    variant='subtitle'
                                    >
                                    Nazwisko
                                </Typography>
                                <TextField
                                    value={lname}
                                    onChange={(e) => setLname(e.target.value)}
                                    type="text" 
                                />
                            </Box>
                        </Box>
                        <Box sx={{display: "block", marginLeft: '5%', marginTop:'2%'}}>
                            <Typography
                                variant='subtitle'
                                >
                                Email
                            </Typography>
                            <br/>
                            <TextField
                                sx={{display: "flex", alignSelf:"stretch"}}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email" 
                            />
                        </Box>
                        <Box sx={{display: "block", marginLeft: '5%'}}>
                        <Typography
                                    variant='subtitle'
                                    >
                                    Data urodzenia
                                </Typography>
                            <br/>
                            <TextField
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                type="date"
                            />
                        </Box>
                        <Box sx={{display: "block", marginLeft: '5%'}}>
                        <Typography
                                    variant='subtitle'
                                    >
                                    Numer telefonu
                                </Typography>
                            <TextField 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                type="tel"
                            />
                        </Box>
                        <Button
                            type="submit"
                                sx ={{marginTop: '5%', marginLeft: '5%'}}
                            >
                                Zatwierdź zmiany
                        </Button>
                    </Grid>
                </form>
            </Container>
  )
}

export default EditProfile
