import { useEffect, useState } from "react";
import { TextField, Button, Typography, Box, Avatar, Stack, Grid2 } from "@mui/material";
import { useForm } from "react-hook-form";
import axiosInstance from "../../../api/axios";
import { endPoints } from "../../../api/endPoints";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import image7 from "../../../assets/images/productup.jpg";


const ProductUpdate = () => {
  const { id } = useParams();
  const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(null);

  const ClickFunction = async (data) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", data.title);
    formData.append("description", data.description);

    
    if (image) {
      formData.append("image", image);
    } else {
      formData.append("image", product?.image);
    }
  

    try {
      setIsLoading(true);
      const response = await axiosInstance.post(endPoints.products.update, formData);

      if (response.status === 200) {
        toast.success(response.data.message || "Product updated successfully!");
      } else {
        toast.error(response.data.message || "Failed to update product!");
      }
    // } catch (error) {
    //   toast.error("An error occurred!");
    } finally {
      setIsLoading(false);
    }
    reset();
    navigate("/plist");
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(endPoints.products.details +id);
        if (response.status === 200) {
          setProduct(response.data.data);
          setValue("title", response.data.data.title);
          setValue("description", response.data.data.description);
        } else {
          toast.error("Failed to fetch product details.");
        }
      // } catch (error) {
      //   toast.error("An error occurred while fetching product details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [id, setValue]);

  return (
    <Grid2
        container
        justifyContent="center"
        alignItems="center"
        style={{
          minHeight: "100vh", background: "#f4f6f8", padding: 20,
          backgroundImage: `url(${image7})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
    <Box
      sx={{
       
          maxWidth: 450,
          margin: "auto",
          mt: 5,
          p: 3,
          border: "1px solid #ccc",
          borderRadius: 2,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
          marginBottom: 8,
          background: "#fce4ec",
          transition:
              "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
            }
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Update Product
      </Typography>
      <form onSubmit={handleSubmit(ClickFunction)}>
        <TextField
          label="title"
          {...register("title", { required: "Title is required" })}
          fullWidth
          margin="normal"
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <TextField
          {...register("description", { required: "Description is required" })}
          multiline
          rows={4}
          fullWidth
          label="description"
          margin="normal"
          error={!!errors.description}
          helperText={errors.description?.message}
        />
         <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
          <Avatar
            alt="Product Picture"
            src={
              image
                ? URL.createObjectURL(image)
                : product?.image
                ? `https://wtsacademy.dedicateddevelopers.us/uploads/product/${product.image}`
                : ""
            }
            sx={{ width: 90, height: 90 }}
          />
          <Button variant="contained" component="label">
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Button>
        </Stack>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
          sx={{ mt: 3, fontSize: 18 }}
        >
          {isLoading ? "Updating..." : "Update Product"}
        </Button>
      </form>
    </Box>
    </Grid2>
  );
};

export default ProductUpdate;
