import React, { useState } from 'react'
import {Container, Typography, TextField, Button} from '@mui/material'
import { changePass } from '../../hooks/hook'
import {useNavigate } from 'react-router-dom'

const ChangePassword = () => {

    const [oldPass, setOldPass] = useState("")
    const [pass, setPass] = useState("")
    const [repeatPass, setRepeatPass] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async(e) =>
    {
        e.preventDefault()

        if(oldPass === pass)
        {
            alert("Stare i nowe hasło są takie same")
            setError(true)
            return
        }
        if(pass !== repeatPass)
        {
            alert("Podane nowe hasła różnią się")
            setError(true)
            return
        }


        const data = await changePass(oldPass, pass)
        .catch((e) => {
            alert("ERROR: " + e.message)
            setOldPass("")
            setPass("")
            setRepeatPass("")
            setError(true)
            return
        })

        if(typeof(data) == "undefined")
        {
            return;
        }

        navigate("/home")
    }

    return (
        <Container sx={{display:"flex", justifyContent: "center", marginTop: 10, marginBottom: 10}}>
        <form className='register-form' onSubmit={onSubmit}>
        <Typography 
            variant="h3"
            marginBottom={3}
            marginTop={3}
        >Zmień hasło</Typography>  
        <Container sx={{justifyContent: "center", marginLeft: 2.5}}>
            <div className='form-control'>
            <Typography 
                variant="subtitle1"
                marginBottom={0.5}
                >Stare hasło</Typography>
            <TextField
                type="text"
                placeholder="123" 
                value={oldPass}
                error={error}
                onChange={(e) => setOldPass(e.target.value)}
                required={true}
            />
            </div>
            <div className='form-control'>
            <Typography 
                variant="subtitle1"
                marginBottom={0.5}
                marginTop={0.5}
                >Nowe hasło</Typography>
            <TextField
                type="password"
                value={pass}
                error={error}
                onChange={(e) => setPass(e.target.value)}
                required={true}
            />
            </div>
            <div className='form-control'>
            <Typography 
                variant="subtitle1"
                marginBottom={0.5}
                marginTop={0.5}
                >Powtórz nowe hasło</Typography>
            <TextField
                type="password"
                value={repeatPass}
                error={error}
                onChange={(e) => setRepeatPass(e.target.value)}
                required={true}
            />
            </div>
            <Button 
            type='submit' 
            variant='outlined' 
            sx={{color: "#fff", marginTop: 1, marginLeft: 5}}
            >Zmień</Button>
        </Container>
        </form>
    </Container>
    )
}

export default ChangePassword
