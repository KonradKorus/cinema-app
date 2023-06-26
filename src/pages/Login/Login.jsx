import React, {useState} from 'react'
import { TextField, Container, Typography, Button } from '@mui/material'
import { createToken, getUserData } from '../../hooks/hook'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const Login = () => {
  const {setIsAdmin, setIsLogged} = useAuth();

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


    if(typeof(token) == "undefined")
    {
        return;
    }

    localStorage.setItem("token", token);

    const data = await getUserData()
    .catch((e) => 
    {
      alert("ERROR: " + e.message)
      setEmail('');
      setPass('');
      setError(true);
    });

    if(data.role === "admin")
    {
      setIsAdmin(true)
    }
    else
    {
      setIsAdmin(false)
    }

    localStorage.setItem("user", JSON.stringify(data));

    setIsLogged(true);

    navigate("/home")
  }

  return (
    <Container sx={{display:"flex", justifyContent: "center", marginTop: 10, marginBottom: 10}}>
    <form className='register-form' onSubmit={onSubmit}>
      <Typography 
        variant="h3"
        marginBottom={'3%'}
        marginLeft={'13%'}
        marginTop={'3%'}
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
          sx={{color: "#fff", marginTop: '10%', marginLeft: '25%'}}
        >Zaloguj</Button>
      </Container>
      <Link to="/forgot-password">
          <Button
            variant='outlined'
            sx={{color: "#fff", marginTop: '5%',marginLeft: '20%'}}
            >
            Zapomniałem hasła
          </Button>
        </Link>
    </form>

  </Container>
)
}

export default Login