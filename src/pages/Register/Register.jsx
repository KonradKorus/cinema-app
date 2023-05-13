import React, {useState, useRef} from 'react'
import { TextField, Container, Typography, FormControlLabel, Checkbox, Button } from '@mui/material'



const Register = ({isLogged}) => {
  const email = useRef()
  const [pass, setPass] = useState('')
  const [repass, setRepass] = useState('')
  const agreement = useRef()
  const [error, setError] = useState(false)

  
  const onSubmit = (e) =>
  {
      e.preventDefault()
      if(pass !== repass)
      {
        setError(!error)
        setPass('')
        setRepass('')
        return
      }
        
  }

  function CheckboxLabeled()
  {
    const [checked, setChecked] = useState(false);

    return (<div>
      <FormControlLabel control={<Checkbox 
      checked={checked}
      ref={agreement}
      required={true}
      onChange={(e)=>setChecked(e.target.checked)}
    />}
    label="Akceptuję warunki umowy"
    />
    </div>
    )
  }

  return (
    <Container sx={{display:"flex", justifyContent: "center", marginTop: 10, marginBottom: 10}}>
      <form className='register-form' onSubmit={onSubmit}>
        <Typography 
          variant="h3"
          marginBottom={3}
          marginTop={3}
        >Zarejestruj się</Typography>  
        <Container sx={{justifyContent: "center", marginLeft: 2.5}}>
          <div className='form-control'>
            <Typography 
              variant="subtitle1"
              marginBottom={0.5}
              >E-mail</Typography>
            <TextField
              type="email"
              placeholder="adamkowalski@test.com" 
              ref={email}
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
          <div className='form-control'>
            <Typography 
                variant="subtitle1"
                marginBottom={0.5}
                marginTop={0.5}
                >Powtórz hasło</Typography>
            <TextField
              type="password"
              value={repass}
              error={error}
              onChange={(e) => setRepass(e.target.value)}
              required={true}
            />
          </div>
          <CheckboxLabeled agreement={agreement}/>
          <Button 
            type='submit' 
            variant='outlined' 
            sx={{color: "#fff", marginTop: 1, marginLeft: 5}}
          >Załóż konto</Button>
        </Container>
      </form>
    </Container>
  )
}

export default Register