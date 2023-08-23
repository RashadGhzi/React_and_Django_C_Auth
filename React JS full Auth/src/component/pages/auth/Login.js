import React, { useState } from "react";
import { Box, Button, TextField, Alert, CircularProgress, Stack, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserLoginMutation } from "../../../services/userAuthApi";
import { jwtTokenUserAuth } from "../../../services/localStorageService";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../../features/userAuth/userAuthTokenSlice";
import Error from "../../../error/Error";

export default function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // wroking with local State
  const [loginError, setLoginError] = useState({});
  const [loginSuccess, setLoginSuccess] = useState({});


  // working with user Login api 
  const [user_login, login_res] = useUserLoginMutation();
  const { isLoading, isError, error } = login_res;
  // console.log(login_res);
  if ((isError) && (error.status === 'FETCH_ERROR')) {
    // console.log('server error ', error.error);
    return <Error error={error} />
  }

  // working with navigation
  // const Navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // console.log(data);
    // console.log(e.currentTarget);
    const email = data.get("email");
    // console.log(email);
    const password = data.get("password");
    // console.log(password)
    const login_data = {
      'email': email,
      password: password,
    }

    const user_login_res = await user_login(login_data);
    // console.log(user_login_res);
    if (user_login_res.error) {
      setLoginError(user_login_res.error.data);
      // console.log('error ', loginError);
    } else {
      setLoginError({});
    }

    if (user_login_res.data) {
      setLoginSuccess(user_login_res.data);
      jwtTokenUserAuth(user_login_res.data.token);
      dispatch(setUserToken(user_login_res.data.token.access));
      navigate('/dashboard');
    } else {
      setLoginSuccess({});
    }





    // getting token from local storage debug testing
    // const {access_token, refresh_token}  = getToken();
    // console.log('gettoken', getToken());
    // console.log("access_token ", access_token);
    // console.log("refresh_token ", refresh_token);

  };
  return (
    <>
      <Box
        component="form"
        noValidate
        id="login-form"
        sx={{ mt: 4, padding: 5 }}
        onSubmit={handleSubmit}
      >
        <Box sx={{ my: 5 }}>
          <TextField
            label="Email"
            color="info"
            type="email"
            required
            focused
            fullWidth
            name="email"
          />

          {loginError.email && <Typography sx={{ color: "red", fontSize: "11px" }} > {loginError.email[0]} </Typography>}
        </Box>
        <Box>
          <TextField
            label="Password"
            color="info"
            type="password"
            required
            focused
            fullWidth
            name="password"
          />
          {loginError.password && <Typography sx={{ color: "red", fontSize: "11px" }} > {loginError.password[0]} </Typography>}

        </Box>
        <Box sx={{ my: 3 }}>
          <Stack direction="row" spacing={5}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{ px: 10 }}
            >
              Login
            </Button>
            <NavLink to="/password/reset">Forgot Password ?</NavLink>
          </Stack>
        </Box>
        <Box>
          {isLoading && <Box textAlign="center" > <CircularProgress color="secondary" /> </Box>}
          {loginError.msg && <Alert severity="error" variant="filled" > {loginError.msg} </Alert>}
          {loginSuccess.token && <Alert severity="success" variant="filled" > Login Succesfull </Alert>}
        </Box>
      </Box>
    </>
  );
}
