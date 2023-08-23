import React, { useState } from "react";
import {
  TextField,
  Typography,
  Grid,
  Box,
  Alert,
  Stack,
  Button,
  CircularProgress
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../../services/localStorageService";
import { useDispatch } from "react-redux";
import { unsetUserToken } from "../../features/userAuth/userAuthTokenSlice";
import { useUserProfileQuery, useChangePasswordMutation } from "../../services/userAuthApi";
import { useSelector } from "react-redux/es/hooks/useSelector";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.userAuthToken.accessToken);
  // console.log('accessToken ',accessToken)

  const { access_token } = getToken();
  // console.log('gettoken ', access_token);


  // working with profile show api 
  const { data, isSuccess, isLoading } = useUserProfileQuery(access_token);

  // working with change password api 
  const [change_pass_api, change_pass_res_arr] = useChangePasswordMutation();
  // console.log(change_pass_res_arr);



  // working with state
  const [changePassSuccess, setChangePassSuccess] = useState({});
  const [changePassError, setChangePassError] = useState({});
  const [nonefieldError, setNoneFieldError] = useState({});

  const handleChangePass = async (event) => {
    event.preventDefault();

    const form_data = new FormData(event.currentTarget);
    const password = form_data.get("password");
    const confirm_password = form_data.get("confirm_password");
    // console.log(password);
    const body = {
      password: password,
      password2: confirm_password,
    }

    const change_pass_res = await change_pass_api({ body, access_token });
    // console.log(change_pass_res);
    if (change_pass_res.data) {
      setChangePassSuccess(change_pass_res.data);
      setChangePassError({});
      setNoneFieldError({});
    } else {
      setChangePassError(change_pass_res.error);
      setNoneFieldError({});
      setChangePassSuccess({});
      if (change_pass_res.error.data.error) {
        setNoneFieldError(change_pass_res.error.data.error);
        setChangePassError({});
      }
    }

  };



  // working logout  
  const handleLogout = () => {
    removeToken();
    dispatch(unsetUserToken());
    navigate("/auth");
  }

  // change password msg check 
  // console.log(changePassSuccess)
  // console.log(changePassError)
  // console.log(nonefieldError);



  return (
    <>
      <Grid container justifyContent="center">
        <Grid
          item
          sm={10}
          justifyContent="center"
          sx={{
            mt: 10,
            py: "40px",
            bgcolor: "purple",
            color: "white",
            borderRadius: "10px",
          }}
        >
          {isLoading && <Box textAlign="center"><CircularProgress /></Box>}

          {isSuccess && <>
            <Typography variant="h3" component="h3" sx={{ textAlign: "center" }}>
              Name : {data.data.name}
            </Typography>
            <Typography variant="h3" component="h3" sx={{ textAlign: "center" }}>
              {data.data.email}
            </Typography>
          </>
          }

        </Grid>

        <Grid item sm={10} mt={10} mb={10}>

          {changePassSuccess.success ? (<Alert severity="success" > {changePassSuccess.success} </Alert>) : changePassError.status === 400 && changePassError.data[0] ? (<Alert severity="error" > {changePassError.data[0]} </Alert>) : changePassError.status === 401 ? (<Alert severity="error" > {changePassError.data.detail} </Alert>) : null}

          <Typography variant="h3" sx={{ mb: 5 }}>
            Change your old password
          </Typography>
          <Box
            component="form"
            method="post"
            onSubmit={handleChangePass}
            noValidate
          >
            <Stack direction="column" spacing={5}>
              <Box>
                <TextField
                  fullWidth
                  type="password"
                  name="password"
                  label="new password"
                  focused
                />
                {nonefieldError.password ? <Typography sx={{ color: "red", fontSize: "11px", fontWeight: "bold" }}> {nonefieldError.password[0]} </Typography> : null}
              </Box>

              <Box>
                <TextField
                  fullWidth
                  type="password"
                  name="confirm_password"
                  label="new confirm password"
                  focused
                />
                {nonefieldError.password2 && <Typography sx={{ color: "red", fontSize: "11px", fontWeight: "bold" }}> {nonefieldError.password2[0]} </Typography>}

              </Box>
              <Button
                type="submit"
                variant="contained"
                sx={{ letterSpacing: 4, py: 2 }}
              >
                done
              </Button>
            </Stack>
          </Box>
          <Button
            type="button"
            variant="contained"
            color="warning"
            fullWidth
            sx={{ letterSpacing: 4, py: 2, my: 4 }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
