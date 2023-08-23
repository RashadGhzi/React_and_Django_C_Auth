import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { TextField, Grid, Stack, Box, Alert, Button, Typography, CircularProgress } from "@mui/material";
import { usePasswordResetConfirmMutation } from "../../../services/userAuthApi";
import { useParams, useNavigate } from "react-router-dom";

export default function PasswordResetConfirm() {
  //   const navigate = useNavigate();
  const { id, token } = useParams();
  const navigate = useNavigate();

  // using local state 
  const [passResSuccess, setPassResSuccess] = useState({});
  const [passResError, setPassResError] = useState({});

  // working with api 
  const [password_reset_confirm, response] = usePasswordResetConfirmMutation();
  const { isLoading } = response;



  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(event);
    const data = new FormData(event.currentTarget);
    // console.log(data);
    const password = data.get("password");
    // console.log(password);
    const confirm_password = data.get("confirm_password");
    // console.log(confirm_password);

    const body = {
      password: password,
      password2: confirm_password,
    }

    const password_reset_confirm_res = await password_reset_confirm({ body, id, token });

    if (password_reset_confirm_res.error) {
      setPassResError(password_reset_confirm_res.error.data.error);
    } else {
      setPassResError({});
    }
    
    if (password_reset_confirm_res.data) {
      setPassResSuccess(password_reset_confirm_res.data);
      navigate('/auth');
    } else {
      setPassResSuccess({});
    }
  };

  // console.log(passResError);
  // console.log('pass success ', passResSuccess);


  return (
    <>
      <Grid container justifyContent="center" sx={{ mt: "30px" }}>
        <Grid item xs={10} md={6}>
          <Box
            component="form"
            method="post"
            onSubmit={handleSubmit}
            noValidate
          >
            <Stack direction="column" spacing={4}>
              <Box>
                <TextField
                  label="Password"
                  type="password"
                  required
                  fullWidth
                  focused
                  placeholder="New Password"
                  name="password"
                />

                {passResError.password && <Typography sx={{ fontSize: "11px", color: "red", fontWeight: "bold" }} > {passResError.password[0]} </Typography>}

              </Box>
              <Box>
                <TextField
                  label="Password Confirm"
                  type="password"
                  required
                  fullWidth
                  focused
                  placeholder="New Password Confirmation"
                  name="confirm_password"
                />

                {passResError.password2 && <Typography sx={{ fontSize: "11px", color: "red", fontWeight: "bold" }} > {passResError.password2[0]} </Typography>}

              </Box>

              <Button
                type="submit"
                sx={{ fontWeight: "bold", py: "10px", letterSpacing: "4px" }}
                variant="contained"
              >
                Done
              </Button>
              {passResError.non_field_errors && <Alert severity="error" variant="standard">{passResError.non_field_errors[0]}</Alert>}
              {passResSuccess.password_updated && <Alert severity="success" variant="standard">{passResSuccess.password_updated}</Alert>}
              {isLoading && <Box textAlign="center">{<CircularProgress />}</Box>}
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}