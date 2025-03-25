import { useState } from "react";
import {
  Stack,
  TextField,
  Button,
  Box,
  Typography,
  Grid2,
} from "@mui/material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axiosInstance from "../../../api/axios";
import { endPoints } from "../../../api/endPoints";
import { Link } from "react-router-dom";
// import image3 from "../../../assets/images/backgroundimg1.jpg";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("profile_pic", image);

    try {
      const response = await axiosInstance.post(
        endPoints.auth.register,
        formData
      );
      if (response.status === 200) {
        toast.success(response.data.message || "Registration successful!");
        localStorage.setItem("token", response.data.token);

        localStorage.setItem("profile_pic", URL.createObjectURL(image));
        window.dispatchEvent(new Event("updateProfilePic"));

        toast.success("Profile picture added successfully!");
      } else {
        toast.error(response.data.message || "Registration failed!");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred during registration."
      );
    }
    reset();
    setImage(null);
  };

  return (
    <Grid2
      container
      justifyContent="center"
      alignItems="center"
      sx={{
          minHeight: "100vh",
          background: "linear-gradient(to right,rgb(247, 202, 190),rgb(249, 246, 212))", 
          padding: 2,
        
      }}
    >
      <Box
        component="form"
        sx={{
          width: "100%",
          maxWidth: 400,
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          borderRadius: 2,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
          padding: 4,
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography
          variant="h4"
          component="h1"
          align="center"
          sx={{ marginBottom: 3, fontWeight: 500 }}
        >
          Registration Form
        </Typography>
        <TextField
          {...register("first_name", { required: "First name is required" })}
          label="First Name"
          fullWidth
          error={!!errors.first_name}
          helperText={errors.first_name?.message}
          margin="normal"
        />
        <TextField
          {...register("last_name", { required: "Last name is required" })}
          label="Last Name"
          fullWidth
          error={!!errors.last_name}
          helperText={errors.last_name?.message}
          margin="normal"
        />
        <Box
          sx={{
            position: "relative",
            display: "inline-flex",
            width: "100%",
          }}
        >
          <TextField
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email format",
              },
            })}
            label="Email"
            type="email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
            margin="normal"
          />
          <EmailOutlinedIcon
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              color: "rgba(0, 0, 0, 0.54)",
            }}
          />
        </Box>
        <Box
          sx={{
            position: "relative",
            display: "inline-flex",
            width: "100%",
          }}
        >
          <TextField
            {...register("password", { required: "Password is required" })}
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
            margin="normal"
          />
          <IconButton
            onClick={togglePasswordVisibility}
            sx={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </Box>

        <TextField
          {...register("profile_pic", {
            required: "Profile picture is required",
          })}
          type="file"
          fullWidth
          onChange={(e) => setImage(e.target.files[0])}
          error={!!errors.profile_pic}
          helperText={errors.profile_pic?.message}
          sx={{
            backgroundColor: "white",
            borderRadius: "5px",
            marginBottom: 2,
          }}
        />
        {image && (
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ marginBottom: 2 }}
          >
            <img
              src={URL.createObjectURL(image)}
              alt="Profile Preview"
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #ddd",
              }}
            />
            <Typography variant="caption">{image.name}</Typography>
          </Stack>
        )}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ padding: 1.5, fontWeight: 600 }}
        >
          Register Now!
        </Button>
        <Typography align="center" sx={{ marginTop: 2 }}>
          Already have an account?{" "}
          <Link to="/" style={{ textDecoration: "none", fontWeight: 600 }}>
            Login
          </Link>
        </Typography>
      </Box>
    </Grid2>
  );
};

export default Registration;
