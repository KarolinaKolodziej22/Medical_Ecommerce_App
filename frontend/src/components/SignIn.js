import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from '@mui/material/Alert';
import { UserContext } from "../userContext";
import { useParams, useLocation, useNavigate} from 'react-router-dom'
import { FeedbackField } from "./shared/feedbackField";
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../actions/userAction'

const theme = createTheme();

const axios = require("axios").default;

/* function login(access_token, setAccessToken, userName, setUserName) {
  setAccessToken(access_token); //uzyskanie dostepu do funkcji 
  setUserName(userName);

  localStorage.setItem("access_token", access_token);
  localStorage.setItem("user_name", userName);
  window.location.href = "http://localhost:3000/";
} */

export default function SignIn(location) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const [error, setError] = React.useState('')
  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split('=')[1] : '/'
  const userLogin = useSelector(state => state.userLogin)
  const {loading, userInfo} = userLogin
  const navigate = useNavigate();

  React.useEffect(() => {
    if(userInfo){
      navigate(redirect) 
    }
  },[userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    //console.log('submitted')
    try{
      dispatch(login(email,password))
    }
    catch{
      console.log(error)
      setError('Niepoprawny login lub hasło!');
    }
   
  }
  /* 
  const setAccessToken = useContext(UserContext).setAccessToken;
  const setUserName = useContext(UserContext).setUserName;
  const [response, setResponse] = React.useState(null); //hook, przechowanie stanu i ustaiwenie na null 
 */
  /* const handleSubmit = (event) => {
    event.preventDefault(); //zapobieganie akcji przesylania domyslnego formularza
    const data = new FormData(event.currentTarget); //tworzenie formularzu na podst. danych obecnych
    axios
      .post("http://localhost:8000/token", data) //przeslanie do serwera
      .then((response) => { //wywolanie funkcji login po otrzymaniu odp
        login(
          response.data["access_token"], //zwracanie tokenu dostepu
          setAccessToken, //aktualizowanie stanu
          data.get("username"), 
          setUserName
        );
      })
      .catch((error) => {
        setResponse(error.response);
      });
  };
 */
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
          <Avatar sx={{ m: 1, bgcolor: "light-grey" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Zaloguj
          </Typography>
          

          <Box
            component="form"
            onSubmit={submitHandler} //funka jaka ma byc wywolana po przeslaniu formularza
            noValidate //nie walidowany przez przegladarke
            sx={{ mt: 1 }}
          >
           {/* <FeedbackField response={response} />  */}

            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Login"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Hasło"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Zapamiętaj mnie"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Zaloguj
            </Button>
            <Grid container>
              <Grid item>
                <Link href={redirect? `/register?redirect=${redirect}` : '/register'} variant="body2">
                  {"Nie posiadasz konta? Zarejestruj się"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
