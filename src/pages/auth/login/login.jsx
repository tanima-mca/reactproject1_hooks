// import {
//   Grid2,
//   Paper,
//   Avatar,
//   TextField,
//   Button,
//   Typography,
//   IconButton,
//   Box,
//   CircularProgress,
// } from "@mui/material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import axiosInstance from "../../../api/axios";
// import { endPoints } from "../../../api/endPoints";
// import image2 from "../../../assets/images/productback5.jpg";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleLogin = async (data) => {
//     const formData = new FormData();
//     formData.append("email", data.email);
//     formData.append("password", data.password);
//     setLoading(true);

//     try {
//       const response = await axiosInstance.post(endPoints.auth.login, formData);
//       if (response.status === 200) {
//         toast.success(response.data.message || "Login successful!");
//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem("isLoggedIn", "true");

//         window.dispatchEvent(new Event("loginStatusChanged"));
//       } else {
//         toast.error(response.data.message || "Login failed!");
//       }
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "An unexpected error occurred!"
//       );
//     } finally {
//       setLoading(false);
//     }
//     reset();
//   };

//   return (
//     <Grid2
//       container
//       justifyContent="center"
//       alignItems="center"
//       style={{
//         minHeight: "100vh",
//         background: "#bbdefb",
//         backgroundImage: `url(${image2})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <Paper
//         elevation={10}
//         style={{
//           padding: 30,
//           width: 300,
//           borderRadius: 15,
//           background: "#f3e5f5",
//           boxShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
//         }}
//       >
//         <Grid2 align="center">
//           <Avatar style={{ background: "#5d4037" }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography
//             variant="h5"
//             style={{ margin: "20px 0", color: "#000", fontWeight: "bold" }}
//           >
//             Sign In
//           </Typography>
//         </Grid2>

//         <form onSubmit={handleSubmit(handleLogin)}>
//           <TextField
//             {...register("email", {
//               required: "Email is required",
//               pattern: {
//                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
//                 message: "Invalid email format",
//               },
//             })}
//             label="Email"
//             placeholder="Enter email"
//             fullWidth
//             margin="normal"
//             error={!!errors.email}
//             helperText={errors.email && errors.email.message}
//           />

//           <Box
//             sx={{
//               position: "relative",
//               display: "inline-flex",
//               width: "100%",
//             }}
//           >
//             <TextField
//               {...register("password", { required: "Password is required" })}
//               label="Password"
//               type={showPassword ? "text" : "password"}
//               fullWidth
//               error={!!errors.password}
//               helperText={errors.password?.message}
//               margin="normal"
//             />
//             <IconButton
//               onClick={togglePasswordVisibility}
//               sx={{
//                 position: "absolute",
//                 right: 10,
//                 top: "50%",
//                 transform: "translateY(-50%)",
//               }}
//             >
//               {showPassword ? <VisibilityOff /> : <Visibility />}
//             </IconButton>
//           </Box>

//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             style={{
//               margin: "20px 0",
//               background: "#3949ab",
//               color: "#fff",
//               fontWeight: "bold",
//             }}
//           >
//             {loading ? (
//               <CircularProgress size={24} color="inherit" />
//             ) : (
//               "Sign In"
//             )}
//           </Button>
//           <Button
//             variant="text"
//             fullWidth
//             onClick={() => navigate("/reg")}
//             style={{
//               color: "#3949ab",
//               fontWeight: "bold",
//               textTransform: "none",
//             }}
//           >
//             Don’t have an account? Register here
//           </Button>
//         </form>
//       </Paper>
//     </Grid2>
//   );
// };

// export default Login;

import {
  Grid2,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../../api/axios";
import { endPoints } from "../../../api/endPoints";
import image2 from "../../../assets/images/productback5.jpg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    setLoading(true);

      try {
        const response = await axiosInstance.post(endPoints.auth.login, formData);
        if (response.status === 200) {
          toast.success(response.data.message || "Login successful!");
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("isLoggedIn", "true");

          window.dispatchEvent(new Event("loginStatusChanged"));
          navigate("/plist");

        } else {
          toast.error(response.data.message || "Login failed!");
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "An unexpected error occurred!"
        );
      } finally {
        setLoading(false);
      }
      reset();
    };

  //   try {
  //     const response = await axiosInstance.post(endPoints.auth.login, formData);
  //     if (response.status === 200) {
  //       const { message, token, profilePicUrl } = response.data;
  //       toast.success(message || "Login successful!");
  //       localStorage.setItem("token", token);
  //       localStorage.setItem("isLoggedIn", "true");
  //       localStorage.setItem("profile_pic", profilePicUrl || "");

        
  //       if (typeof onLogin === "function") {
  //         onLogin(profilePicUrl || null);
  //       }
  //     } else {
  //       toast.error(response.data.message || "Login failed!");
  //     }
  //   } catch (error) {
  //     toast.error(
  //       error.response?.data?.message || "An unexpected error occurred!"
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  //   reset();
  // };
  return (
    <Grid2
      container
      justifyContent="center"
      alignItems="center"
      style={{
        minHeight: "100vh",
        background: "#bbdefb",
        backgroundImage: `url(${image2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper
        elevation={10}
        style={{
          padding: 30,
          width: 300,
          borderRadius: 15,
          background: "#f3e5f5",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
        }}
      >
        <Grid2 align="center">
          <Avatar style={{ background: "#5d4037" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            variant="h5"
            style={{ margin: "20px 0", color: "#000", fontWeight: "bold" }}
          >
            Sign In
          </Typography>
        </Grid2>

        <form onSubmit={handleSubmit(handleLogin)}>
          <TextField
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email format",
              },
            })}
            label="Email"
            placeholder="Enter email"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email && errors.email.message}
          />

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

          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{
              margin: "20px 0",
              background: "#3949ab",
              color: "#fff",
              fontWeight: "bold",
            }}
            disabled={loading}
          >
            {loading ? (
              <AutorenewIcon
                sx={{
                  animation: "spin 1s infinite linear",
                  fontSize: 24,
                  color: "#fff",
                }}
              />
            ) : (
              "Sign In"
            )}
          </Button>
          <Button
            variant="text"
            fullWidth
            onClick={() => navigate("/reg")}
            style={{
              color: "#3949ab",
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Don’t have an account? Register here
          </Button>
        </form>
      </Paper>
    </Grid2>
  );
};

export default Login;


