import React from 'react'
import { Box, Grid, Typography } from '@mui/material'

export default function Error(props) {
  // console.log('error page ', props);
  return (
    <>
        <Grid container justifyContent="center">
            <Grid item md={8} xs={10}>
                <Typography variant="h4" sx={{color:"red", marginTop:"50px"}} >
                    {props.error.status} : {props.error.error}
                </Typography>
            </Grid>
        </Grid>
    </>
  )
}
