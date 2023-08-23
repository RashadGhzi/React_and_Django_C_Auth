import React, { useState } from "react";
import { Box, Button, TextField, Alert, Stack, Grid, Typography, CircularProgress } from "@mui/material";
// import { NavLink } from "react-router-dom";
import { usePasswordResetMutation } from "../../../services/userAuthApi";
import { useNavigate } from "react-router-dom";
import Error from "../../../error/Error";

export default function PasswordReset() {

  // working with state to show notification
  const [passwordResetSuccess, setPasswordResetSuccess] = useState({});
  const [passwordResetError, setPasswordResetError] = useState({});

  // const [nonFieldError, setNonFieldError] = useState({});


  // working with password reset api 
  const [password_reset, response] = usePasswordResetMutation();
  const { isLoading, isError, error } = response;




  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const body = {
      email: email
    }
    // console.log(email);    


    const password_reset_res = await password_reset(body);
    // console.log(password_reset_res);

    if (password_reset_res.data) {
      setPasswordResetSuccess(password_reset_res.data);
    } else {
      setPasswordResetSuccess({});
    }

    if (password_reset_res.error) {
      setPasswordResetError(password_reset_res.error.data.error);
    } else {
      setPasswordResetError({});
    }

  };

  if ((isError) && (error.status === 'FETCH_ERROR')) {
    // console.log('server error ', error.error);
    return <Error error={error} />
  } else {
    return (
      <>
        <Grid container justifyContent="center">
          <Grid item md={6} xs={12}>
            <Stack spacing={4} sx={{ mt: 5 }}>
              <Box
                component="form"
                method="post"
                id="password-reset"
                onSubmit={handlePasswordReset}
                noValidate
              >
                <Box>
                  <TextField
                    fullWidth
                    label="Email"
                    placeholder="enter your email"
                    type="email"
                    focused
                    required
                    name="email"
                  />

                  {(passwordResetError.email) && <Typography sx={{ fontSize: "11px", fontWeight: "bold", color: "red" }} >
                    {passwordResetError.email[0]}
                  </Typography>}
                  {(passwordResetError.non_field_errors) && <Typography sx={{ fontSize: "11px", fontWeight: "bold", color: "red" }} >
                    {passwordResetError.non_field_errors[0]}
                  </Typography>}

                </Box>

                <Button
                  sx={{ mt: 4 }}
                  size="large"
                  fullWidth
                  variant="contained"
                  color="info"
                  type="submit"
                >
                  send
                </Button>

                <Box sx={{ mt: "20px" }}>
                  {isLoading ? <Box textAlign="center" > <CircularProgress color="inherit" /> </Box> :
                    (
                      passwordResetSuccess.email_send && <Alert severity="success" variant="standard" >
                        {passwordResetSuccess.email_send}
                      </Alert>
                    )
                  }

                  {/* {isError && (error.status === 'FETCH_ERROR') && <Navigate to="/error" />} */}
                </Box>
              </Box>
              <Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </>
    );
  }
}
