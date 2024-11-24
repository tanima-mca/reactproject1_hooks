import React from 'react';
import {Grid,Paper, Avatar, TextField, Button, Typography, Link, FormControlLabel, Checkbox } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const ClickFuntion=()=>{

  }


  return (
     <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', background: '#e1bee7' }}>
      <Paper elevation={10} style={{ padding: 20, width: 280, borderRadius: 10 }}>
         <Grid align="center"> 
          <Avatar style={{ background: '#3949ab' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" style={{ margin: '10px 0', color: '#3949ab' }}>
            Sign In
          </Typography>
         </Grid> 

        <TextField
       {...register("username" ,{
        required:"username is required"
       })}
          label="username"
          required
          placeholder="Enter username"
          fullWidth
          margin="normal"
          error={errors.username}
          helperText={errors.username && errors.username.message}
        />

        <TextField
        {...register ("password",{
          required:"password is required"
        })}
          label="password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
          margin="normal"
          error={errors.password}
          helperText={errors.password && errors.password.message}
        />

        <label>
          <input 
          type='checkbox'
          value='Remember me'
          {...register("option",{required:"please check the option"})}
        />
        Remember me
        </label>
        <br/>
        {errors.option &&<p style={{color:"red"}}>{errors.option.message}</p>}

        {/* <FormControlLabel
          control={<Checkbox color="primary" />}
          label="Remember me"
        /> */}

        <Button
          onClick={handleSubmit(ClickFuntion)}
          variant="contained"
          fullWidth
          style={{ margin: '10px 0', background: '#3949ab', color: '#fff' }}
        >
          Sign In
        </Button>
      </Paper>
     </Grid>
  )
};

export default Login;
