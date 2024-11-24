import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
import { useForm } from 'react-hook-form';

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const ClickFuntion = () => {

  }
  // const { register, handleSubmit } = useForm();

  // function onSubmitButton(data) {
  //   console.log(data)
  // }


  return (
    <>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 400,
          margin: '0 auto',
          padding: 4,
          borderRadius: 3,
          boxShadow: 10,
          marginTop: 2,
          marginBottom: 2,
          backgroundColor: '#bbdefb',
          '& .MuiTextField-root': { marginBottom: 2 },
        }}
      >
        <Typography variant="h4" component="h1" marginBottom={4} align='center'>
          <b> Registration Form</b>
        </Typography>
        <TextField
          {...register("first_name", {
            required: "First_name is required"
          })}
          label="first_name"
          variant="outlined"
          required
          error={errors.first_name}
          helperText={errors.first_name && errors.first_name.message}
        />
        <TextField
          {...register("last_name", {
            required: "last_name is required"
          })}
          label="last_name"
          required
          variant="outlined"
          error={errors.last_name}
          helperText={errors.last_name && errors.last_name.message}
        />
        <TextField
          {...register("email", {
            required: "email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email format"

            }
          })}
          label="email"
          required
          type="email"
          variant="outlined"
          error={errors.email}
          helperText={errors.email && errors.email.message}
        />
        <TextField
          {...register("password", {
            required: "password is required"
          })}
          label="password"
          required
          variant="outlined"
          color="secondary"
          type="password"
          error={errors.password}
          helperText={errors.password && errors.password.message}
        />
        <Button variant='outlined' onClick={handleSubmit(ClickFuntion)} sx={{ mt: 3, /* margin top */ fontSize: 18, color: '#1a237e' }}><b>Register Now!</b></Button>
      </Box>
    </>
  )
}

export default Registration


