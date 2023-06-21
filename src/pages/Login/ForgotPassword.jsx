import { Container, TextField, Typography, Button } from '@mui/material'
import { Grid } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendMail } from '../../hooks/hook'

const ForgotPassword = () => {

    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    const onSubmit = async(e) => 
    {
        e.preventDefault()

        const resp = await sendMail(email)
        .catch((e) => 
        {
            alert(e.message)
            setEmail("")
            return
        })

        if(typeof(resp) === "undefined")
        {
            return;
        }

        alert(`Wysłano wiadomość z linkiem do resetu hasła na ${email}`)
        localStorage.setItem("resetEmail", email)
        navigate("/home")
    }

  return (
    <Container sx={{display:"flex", justifyContent: "center", marginTop: 10, marginBottom: 10}}>
        <form className='register-form' onSubmit={onSubmit}>
            <Typography 
                variant="h3"
                marginBottom={3}
                marginTop={3}
            >Zresetuj hasło</Typography>  
            <Container sx={{justifyContent: "center", marginLeft: 2.5}}>
                <div className='form-control'>
                <Typography 
                    variant="subtitle1"
                    marginBottom={0.5}
                    >Podaj email</Typography>
                <TextField
                    type="text"
                    placeholder="test@test.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
                />
                </div>
                <Button 
                type='submit' 
                variant='outlined' 
                sx={{color: "#fff", marginTop: 1, marginLeft: '25%'}}
                >Wyślij</Button>
            </Container>
        </form>
    </Container>
  )
}

export default ForgotPassword
