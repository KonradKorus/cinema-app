import React, {useState} from 'react'
import { TextField, Container, Typography, Button } from '@mui/material'
import { createToken } from '../../hooks/hook'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const Login = () => {
  const {setIsLogged} = useAuth();

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState(false)

  const navigate = useNavigate();

  const onSubmit = async(e) => 
  { 
    e.preventDefault()

    const token = await createToken(email, pass)
    .catch((error) =>
    {
        alert("ERROR: " + error.message);
        setEmail('');
        setPass('');
        setError(true);
    });
    console.log(token)

    if(typeof(token) == "undefined")
    {
        return;
    }

    localStorage.setItem("user", {"username": email, "token": token});
    setIsLogged(true);

    navigate("/home")
  }

  return (
    <Container sx={{display:"flex", justifyContent: "center", marginTop: 10, marginBottom: 10}}>
    <form className='register-form' onSubmit={onSubmit}>
      <Typography 
        variant="h3"
        marginBottom={3}
        marginTop={3}
      >Zaloguj się</Typography>  
      <Container sx={{justifyContent: "center", marginLeft: 2.5}}>
        <div className='form-control'>
          <Typography 
            variant="subtitle1"
            marginBottom={0.5}
            >E-mail</Typography>
          <TextField
            type="email"
            placeholder="adamkowalski@test.com" 
            value={email}
            error={error}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          />
        </div>
        <div className='form-control'>
          <Typography 
              variant="subtitle1"
              marginBottom={0.5}
              marginTop={0.5}
              >Hasło</Typography>
          <TextField
            type="password"
            value={pass}
            error={error}
            onChange={(e) => setPass(e.target.value)}
            required={true}
          />
        </div>
        <Button 
          type='submit' 
          variant='outlined' 
          sx={{color: "#fff", marginTop: 1, marginLeft: 5}}
        >Zaloguj</Button>
      </Container>
    </form>
  </Container>
)
}

export default Login