import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { FeedbackField } from "./shared/feedbackField";
import {register} from '../actions/userAction'


const theme = createTheme();

// const axios = require("axios").default; //do wywolan zadan sieciowych

export default function SignUp(location) {
  /* const [response, setResponse] = React.useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios
      .post("http://localhost:8000/users", data)
      .then((response) => {
        setResponse(response);
      })
      .catch((error) => {
        setResponse(error.response);
      }); */
        const [name, setName] = React.useState('')
        const [email, setEmail] = React.useState('')

        const [password, setPassword] = React.useState('')
        const [confirmPassword, setConfirmPassword] = React.useState('')

        const [error, setError] = React.useState('')
        const dispatch = useDispatch();
        const [message, setMessage] = React.useState('')
      
        const redirect = location.search ? location.search.split('=')[1] : '/'
        const userRegister = useSelector(state => state.userRegister)
        const {loading, userInfo} = userRegister
        const navigate = useNavigate();
      
        React.useEffect(() => {
          if(userInfo){
            navigate(redirect) 
          }
        },[userInfo, redirect])
      
        const submitHandler = (e) => {
          e.preventDefault()
          //console.log('submitted')
          if(password != confirmPassword){
            setMessage('Podane hasła są inne!')
          }else{
          dispatch(register(name,email,password))
        }
        }
  

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "grey" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Zarejestruj się
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={submitHandler}
            sx={{ mt: 3 }}
          >
           <Grid container spacing={2}>
             <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Imię"
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="email"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required //formularz nie wysle sie bez tych danych
                  fullWidth
                  name="password"
                  label="Hasło"
                  type="password" //znaki ukrywane
                  id="password" 
                  autoComplete="new-password" //zabezpieczenie przez zachowaniem automatycznych hasel
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  reguired
                  id="confirmPassword"
                  label="Powtórz hasło"
                  name="confirmPassword"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Zarejestruj
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              <Link href={redirect? `/login?redirect=${redirect}` : '/login'} variant="body2">
                  {"Posiadasz konto? Zaloguj się"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
