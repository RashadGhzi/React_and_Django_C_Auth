import { Grid, Card, Box, Tabs, Tab } from "@mui/material";
import React, { useState } from "react";
import authimg from "./images/shopping_auth.png";
import Login from "./Login";
import Register from "./Register";

export default function LoginReg() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const CustomTabPanel = (props) => {
    const { children, value, index } = props;
    return (
      <div role="tabpanel" hidden={value !== index}>
        {value === index && <Box>{children}</Box>}
      </div>
    );
  };
  return (
    <>
      <Grid container sx={{ height: "100vh" }}>
        <Grid
          item
          xs={7}
          sx={{
            backgroundImage: `url(${authimg})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></Grid>
        <Grid item xs={5}>
          <Card sx={{ width: "100%", height: "100%" }}>
            <Box>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={value} onChange={handleChange}>
                  <Tab label="Login" />
                  <Tab label="Registration" />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <Login />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Register />
              </CustomTabPanel>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
