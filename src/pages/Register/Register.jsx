import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Container,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
} from '@mui/material';
import { createToken, getUserData } from '../../hooks/hook';
import { useAuth } from '../../contexts/AuthContext';

const Register = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const [repass, setRepass] = useState('');
  const agreement = useRef();
  const [error, setError] = useState(false);

  const { setIsAdmin, setIsLogged } = useAuth();
  const navigate = useNavigate();

  const sendRegistrationData = async () => {
    const toSend = {
      first_name: fname,
      last_name: lname,
      date_of_birth: date + 'T00:00:0.000Z',
      email: email,
      phone: phone,
      image_url: '',
      password: pass,
    };

    const res = await fetch(process.env.REACT_APP_API_URL + '/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(toSend),
    });

    const data = await res.json();

    if (!data.hasOwnProperty('email')) {
      throw new Error(data.detail);
    } else {
      return data;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (pass !== repass) {
      setError(!error);
      setPass('');
      setRepass('');
      return;
    }

    const data = await sendRegistrationData().catch((e) => {
      alert('ERROR: ' + e.message);
      setFname('');
      setLname('');
      setDate('');
      setEmail('');
      setPhone('');
      setPass('');
      setRepass('');
    });

    if (typeof data == 'undefined') {
      return;
    }

    const token = await createToken(email, pass).catch((e) => {
      alert('ERROR: ' + e.message);
      setFname('');
      setLname('');
      setDate('');
      setEmail('');
      setPhone('');
      setPass('');
      setRepass('');
      return;
    });

    if (typeof token == 'undefined') {
      return;
    }

    localStorage.setItem('token', token);

    const userData = await getUserData().catch((e) => {
      alert('ERROR: ' + e.message);
      setFname('');
      setLname('');
      setDate('');
      setEmail('');
      setPhone('');
      setPass('');
      setRepass('');
    });

    if (typeof userData == 'undefined') {
      return;
    }

    if (userData.role === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }

    localStorage.setItem('user', JSON.stringify(userData));
    setIsLogged(true);
    navigate('/home');
  };

  function CheckboxLabeled() {
    const [checked, setChecked] = useState(false);

    return (
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              ref={agreement}
              required={true}
              onChange={(e) => setChecked(e.target.checked)}
            />
          }
          label="Akceptuję warunki umowy"
        />
      </div>
    );
  }

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <form className="register-form" onSubmit={onSubmit}>
        <Typography variant="h3" marginBottom={3} marginTop={3}>
          Zarejestruj się
        </Typography>
        <Container sx={{ justifyContent: 'center', marginLeft: 2.5 }}>
          <div className="form-control">
            <Typography variant="subtitle1" marginBottom={0.5}>
              Imie
            </Typography>
            <TextField
              placeholder="Adam"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              required={true}
            />
          </div>
          <div className="form-control">
            <Typography variant="subtitle1" marginBottom={0.5}>
              Nazwisko
            </Typography>
            <TextField
              placeholder="Kowalski"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              required={true}
            />
          </div>
          <div className="form-control">
            <Typography variant="subtitle1" marginBottom={0.5}>
              Data Urodzenia
            </Typography>
            <TextField
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required={true}
            />
          </div>
          <div className="form-control">
            <Typography variant="subtitle1" marginBottom={0.5}>
              E-mail
            </Typography>
            <TextField
              type="email"
              placeholder="adamkowalski@test.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
          </div>
          <div className="form-control">
            <Typography variant="subtitle1" marginBottom={0.5}>
              Numer Telefonu
            </Typography>
            <TextField
              type="tel"
              placeholder="123456789"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required={false}
            />
          </div>
          <div className="form-control">
            <Typography variant="subtitle1" marginBottom={0.5} marginTop={0.5}>
              Hasło
            </Typography>
            <TextField
              type="password"
              value={pass}
              error={error}
              onChange={(e) => setPass(e.target.value)}
              required={true}
            />
          </div>
          <div className="form-control">
            <Typography variant="subtitle1" marginBottom={0.5} marginTop={0.5}>
              Powtórz hasło
            </Typography>
            <TextField
              type="password"
              value={repass}
              error={error}
              onChange={(e) => setRepass(e.target.value)}
              required={true}
            />
          </div>
          <CheckboxLabeled agreement={agreement} />
          <Button
            type="submit"
            variant="outlined"
            sx={{ color: '#fff', marginTop: 1, marginLeft: 5 }}
          >
            Załóż konto
          </Button>
        </Container>
      </form>
    </Container>
  );
};

export default Register;
