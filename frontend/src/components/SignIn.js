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
import { UserContext } from "../userContext";
import { useContext } from "react";

import { FeedbackField } from "./shared/feedbackField";

const theme = createTheme();

const axios = require("axios").default;

function login(access_token, setAccessToken, userName, setUserName) {
  setAccessToken(access_token); //uzyskanie dostepu do funkcji 
  setUserName(userName);
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("user_name", userName);
  window.location.href = "http://localhost:3000/";
}

export default function SignIn() {
  const setAccessToken = useContext(UserContext).setAccessToken;
  const setUserName = useContext(UserContext).setUserName;
  const [response, setResponse] = React.useState(null); //hook, przechowanie stanu i ustaiwenie na null 

  const handleSubmit = (event) => {
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
            onSubmit={handleSubmit} //funka jaka ma byc wywolana po przeslaniu formularza
            noValidate //nie walidowany przez przegladarke
            sx={{ mt: 1 }}
          >
            <FeedbackField response={response} /> 

            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Login"
              name="username"
              autoComplete="username"
              autoFocus
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
                <Link href="/signup" variant="body2">
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
