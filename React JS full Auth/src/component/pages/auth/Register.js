import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Alert,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useUserCreationMutation } from "../../../services/userAuthApi";


export default function Register() {

  // working with error state 
  const [serverError, setServerError] = useState({});
  const [successData, setSuccessData] = useState({});


  // working with user creation api 
  // const user_res = useUserCreationMutation();
  // console.log(user_res);

  const [user_create, create_res] = useUserCreationMutation();
  // console.log(create_res);
  const { isLoading } = create_res;

  // working with formdata
  const handleRegisterForm = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const register_data = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password_1"),
      password2: data.get("password_2"),
      // reg_check: data.get("reg_check"),
    };

    const user_create_res = await user_create(register_data)

    // console.log('user ', user_create_res);

    // console.log(user_create_res);
    // console.log(user_create_res.error.data.error);

    if (user_create_res.error) {
      setServerError(user_create_res.error.data.error)
      // console.log('server error ', serverError);
    } else {
      setServerError({});
    }

    if (user_create_res.data) {
      // console.log(user_create_res.data)
      setSuccessData(user_create_res.data);
    } else {
      setSuccessData({});
    }
  };

  return (
    <>
      <Box
        component="form"
        noValidate
        method="post"
        sx={{ mt: 4, padding: 5 }}
        id="register-form"
        onSubmit={handleRegisterForm}
      >
        <Stack spacing={4} direction="column">

          <Box>
            <TextField
              label="Name"
              type="text"
              name="name"
              focused
              fullWidth
              required
            />
            {serverError.name &&
              <Typography sx={{ color: "red", fontSize: "11px" }} >{serverError.name[0]}</Typography>
            }
          </Box>
          <Box>
            <TextField
              label="Email"
              type="email"
              name="email"
              focused
              fullWidth
              required
            />
            {serverError.email &&
              <Typography sx={{ color: "red", fontSize: "11px" }} >{serverError.email[0]}</Typography>
            }
          </Box>
          <Box>
            <TextField
              label="Password"
              type="password"
              name="password_1"
              fullWidth
              focused
              required
            />
            {serverError.password &&
              <Typography sx={{ color: "red", fontSize: "11px" }} >{serverError.password[0]}</Typography>
            }
          </Box>
          <Box>
            <TextField
              label="Confirm Password"
              type="password"
              name="password_2"
              fullWidth
              focused
              required
            />
            {serverError.password2 &&
              <Typography sx={{ color: "red", fontSize: "11px" }} >{serverError.password2[0]}</Typography>
            }
          </Box>
        </Stack>
        <Stack direction="row" sx={{ py: 2, justifyContent: "space-between" }}>
          <Box>
            <Button
              variant="contained"
              sx={{ px: 10, fontWeight: "bold", textTransform: "none" }}
              color="success"
              type="submit"
            >
              Register
            </Button>
          </Box>
          <NavLink to="/auth">Already have an account ? Login</NavLink>
        </Stack>

        {isLoading && <Box textAlign="center" > <CircularProgress /> </Box>}

        {serverError.non_field_errors &&
          <Box>
            <Alert variant="filled" severity="error" color="error" > {serverError.non_field_errors} </Alert>
          </Box>
        }
        {successData.created && <Box>
          <Alert variant="filled" severity="success" color="success" > Data has been created successfully </Alert>
        </Box>}
      </Box>
    </>
  );
}
