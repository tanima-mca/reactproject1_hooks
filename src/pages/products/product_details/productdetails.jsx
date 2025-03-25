// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Box, Typography, CircularProgress, Paper, Button, Grid, TextField, Stack, Avatar, Input } from "@mui/material";
// import axiosInstance, { productt } from "../../../api/axios";
// import { endPoints } from "../../../api/endPoints";
// import toast from "react-hot-toast";
// // import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';
// import { Link } from "react-router-dom";
// import { useForm } from "react-hook-form";

// const ProductDetails = () => {
//     const { id } = useParams();
//     const [product, setProduct] = useState(null);
//     const [image, setImage] = useState()
//     const [isLoading, setIsLoading] = useState(false);
//     const { register, handleSubmit, setValue, formState: { errors } } = useForm();

//     const ClickFunction = async (data) => {
//         const formData = new FormData();
//         formData.append("id", id)
//         formData.append("title", data.title);
//         formData.append("description", data.description);
//         if (image) {
//             formData.append("image", image);
//         } else {
//             formData.append("image", product.image);
//         }

//         try {
//             const response = await axiosInstance.post(endPoints.products.update, formData);

//             if (response.status === 200) {
//                 toast.success(response.data.message || "Product created successfully!");
//             } else {
//                 toast.error(response.data.message || "Failed to create product!");
//             }
//         } catch (error) {
//             toast.error(response.data.message || "An error occurred!");
//         }
//         reset();
//         setImage(null);
//     };
//     useEffect(() => {
//         const fetchProductDetails = async () => {
//             setIsLoading(true);
//             try {
//                 const response = await axiosInstance.get(endPoints.products.details + id);
//                 if (response.status === 200 && response.data.data) {
//                     setProduct(response.data.data);
//                 } else {
//                     toast.error("Failed to fetch product details.");
//                 }
//             } catch (error) {
//                 toast.error(error.message || "An error occurred while fetching product details.");
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         fetchProductDetails();
//     }, [id]);

//     useEffect(() => {
//         setValue("title", product?.title);
//         setValue("description", product?.description);
//         setValue("image", image);
//     }, [product])

//     if (isLoading) {
//         return (
//             <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
//                 <CircularProgress />
//             </Box>
//         );
//     }

//     if (!product) {
//         return (
//             <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
//                 <Typography variant="h6">Product not found.</Typography>
//             </Box>
//         );
//     }

//     return (
//         <>
//             <Grid
//                 container
//                 justifyContent="center"
//                 alignItems="center"
//                 style={{ minHeight: "100vh", background: "#d1c4e9", padding: 20 }}
//             >
//                 <Paper style={{ width: "100%", maxWidth: 500, padding: 25, background: "#80cbc4", borderRadius: 15 }}>
//                     <Typography
//                         variant="h5"
//                         align="center"
//                         gutterBottom
//                         style={{ marginBottom: 20 }}
//                     >
//                         Create Product
//                     </Typography>
//                     <form>
//                         <TextField
//                             {...register("title", { required: "Title is required" })}
//                             label="Title"
//                             placeholder="Enter product title"
//                             fullWidth
//                             margin="normal"
//                             error={!!errors.title}
//                             helperText={errors.title?.message}
//                         />
//                         <TextField
//                             {...register("description", { required: "Description is required" })}
//                             label="Description"
//                             placeholder="Enter product description"
//                             fullWidth
//                             margin="normal"
//                             multiline
//                             rows={4}
//                             error={!!errors.description}
//                             helperText={errors.description?.message}
//                         />
//                         {/* <TextField
//                             {...register("image", { required: "Image is required" })}
//                             type="file"
//                             variant="outlined"
//                             onChange={(e) => setImage(e.target.files[0])}
//                             error={!!errors.image}
//                             helperText={errors.image?.message}
//                             fullWidth
//                             sx={{ backgroundColor: "white", borderRadius: "5px", mb: 2 }}
//                         /> */}
//                         <Stack direction="row" alignItems="center" spacing={2} sx={{ marginTop: 2 }}>
//                             <Avatar
//                                 alt="Product Picture"
//                                 src={
//                                     image
//                                         ? URL.createObjectURL(image)
//                                         : product?.image
//                                             ? `https://wtsacademy.dedicateddevelopers.us/uploads/product/${product.image}`
//                                             : ''
//                                 }
//                                 sx={{ width: 90, height: 90 }}
//                             />
//                             <label htmlFor="product-pic-upload">
//                                 <Input
//                                     accept="image/*"
//                                     id="product-pic-upload"
//                                     type="file"
//                                     onChange={(e) =>
//                                         setImage(e.target.files ? e.target.files[0] : null)
//                                     }
//                                 />

//                             </label>
//                         </Stack>
//                         <Button variant='contained' onClick={handleSubmit(ClickFunction)} fullWidth sx={{ mt: 3, fontSize: 18, color: '#000' }}><b>Create product!</b></Button>
//                     </form>
//                 </Paper>
//             </Grid>
//         </>

//     );
// };

// export default ProductDetails;

import { useEffect, useState } from "react";
import {
  Typography,
  CircularProgress,
  Paper,
  Button,
  Grid2,
} from "@mui/material";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../../api/axios";
import toast from "react-hot-toast";
import { endPoints } from "../../../api/endPoints";
// import image6 from "../../../assets/images/productback3.jpg";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(
          endPoints.products.details + id
        );
        console.log("API response:", response);

        if (response.status === 200) {
          setProduct(response.data.data);
        } else {
          toast.error("Failed to fetch product details.");
        }
      } catch (error) {
        toast.error(
          error.message || "An error occurred while fetching product details."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  return (
    <Grid2
      container
      justifyContent="center"
      alignItems="center"
      style={{
        background: "linear-gradient(to right,rgb(223, 243, 191),rgb(233, 242, 208))",
        padding: "16px",
      }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : product ? (
        <Paper
          sx={{
            maxWidth: 450,
            width: "100%",
            padding: 4,
            margin: 6,
            borderRadius: 2,
            backgroundColor: "#e0f2f1",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.8)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            transition:
              "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: 6,
            },
          }}
        >
          {/* Product Image */}
          <img
            src={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${product.image}`}
            alt={product.title}
            style={{
              width: "100%",
              maxHeight: 300,
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "16px",
            }}
          />

          {/* Product Title */}
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#4527a0" }}
          >
            {product.title}
          </Typography>

          {/* Product Description */}
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.6, marginBottom: "24px" }}
          >
            {product.description}
          </Typography>

          {/* Buttons */}
          <Grid2 container justifyContent="center" gap={2}>
            <Link to={`/pupdate/${id}`} style={{ textDecoration: "none" }}>
              {/* <Button variant="contained" color="primary">
                                Edit
                            </Button> */}
              <Button
                variant="contained"
                color="primary"
                sx={{
                  "&:hover": {
                    backgroundColor: "#1976d2",
                    transform: "scale(1.05)", // Scales up the button slightly
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                  },
                  transition: "transform 0.3s ease, background-color 0.3s ease", // Smooth transition for the transform and color
                }}
              >
                Edit
              </Button>
            </Link>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/plist")}
            >
              Back to Product List
            </Button>
          </Grid2>
        </Paper>
      ) : (
        <Typography
          variant="h6"
          color="text.secondary"
          align="center"
          sx={{ fontStyle: "italic" }}
        >
          Product not found.
        </Typography>
      )}
    </Grid2>
  );
};

export default ProductDetails;
