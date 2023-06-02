import React, { useState } from 'react'
import {Container, Typography, TextField, Button} from '@mui/material'
import { resetPass } from '../../hooks/hook'
import { useNavigate, useParams } from 'react-router-dom'

const ResetPassword = () => {
    const {resetToken} = useParams();

    const [pass, setPass] = useState();
    const [repeatPass, setRepeatPass] = useState();
    const [error, setError] = useState();

    const email = localStorage.getItem("resetEmail")
    const navigate = useNavigate()

    const onSubmit = async(e) =>
    {
      e.preventDefault();

      if(pass !== repeatPass)
      {
        alert("Podane hasła różnią się")  
        setError(true)
        setPass('')
        setRepeatPass('')
        return
      }


      const res = await resetPass(email, resetToken, pass)
      .catch((e) => 
      {
          alert(e.message)
          setPass('')
          setRepeatPass('')
          setError(true)
      });

      if(typeof(res) === "undefined")
      {
        return;
      }
      
      localStorage.removeItem("resetEmail")
      navigate('/login')
    }

  return (
    <Container sx={{display:"flex", justifyContent: "center", marginTop: 10, marginBottom: 10}}>
    <form className='register-form' onSubmit={onSubmit}>
    <Typography 
        variant="h3"
        marginBottom={3}
        marginTop={3}
        marginLeft={'6%'}
    >Zmień hasło</Typography>  
    <Container sx={{justifyContent: "center", marginLeft: 2.5}}>
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
        sx={{color: "#fff", marginTop: 1, marginLeft: '30%'}}
        >Zmień</Button>
    </Container>
    </form>
</Container>
  )
}

export default ResetPassword
