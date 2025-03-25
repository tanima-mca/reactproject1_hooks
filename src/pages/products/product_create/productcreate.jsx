import { useState } from "react";
import {
  Stack,
  Paper,
  TextField,
  Button,
  Typography,
  Grid2,
} from "@mui/material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axiosInstance from "../../../api/axios";
import { endPoints } from "../../../api/endPoints";
import { useNavigate } from "react-router-dom";
// import image4 from "../../../assets/images/productback1.jpg";



const ProductCreate = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [image, setImage] = useState(null);

  const ClickFunction = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("image", data.image[0]);

    try {
      const response = await axiosInstance.post(endPoints.products.create, formData);

      if (response.status === 200) {
        toast.success(response.data.message || "Product created successfully!");
      } else {
        toast.error(response.data.message || "Failed to create product!");
      }
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred!");
    }
    reset();
    navigate("/plist");
    setImage(null);
  };

  return (
    <>
      <Grid2
        container
        justifyContent="center"
        alignItems="center"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(to right,#d1c4e9,rgb(238, 206, 254))", 
        }}
      >
        <Paper style={{ width: "100%", maxWidth: 400, padding: 25, background: "#f3e5f5", borderRadius: 15 , 
         boxShadow: "0 4px 20px rgba(0, 0, 0, 0.8)"}}
       >
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            style={{ marginBottom: 20 }}
          >
            Create Product
          </Typography>
          <form>
            <TextField
              {...register("title", { required: "Title is required" })}
              label="Title"
              placeholder="Enter product title"
              fullWidth
              margin="normal"
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              {...register("description", { required: "Description is required" })}
              label="Description"
              placeholder="Enter product description"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
            <TextField
              {...register("image", { required: "Image is required" })}
              type="file"
              variant="outlined"
              onChange={(e) => setImage(e.target.files[0])}
              error={!!errors.image}
              helperText={errors.image?.message}
              fullWidth
              sx={{ backgroundColor: "white", borderRadius: "5px", mb: 2 }}
            />
            {image && (
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ marginBottom: "1rem", gap: "0.5rem" }}
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  height={100}
                  width="auto"
                  style={{ borderRadius: "10px" }}
                />
                <Typography variant="caption" display="block">
                  Selected file: {image.name}
                </Typography>
              </Stack>
            )}
            <Button variant='contained' onClick={handleSubmit(ClickFunction)} fullWidth sx={{ mt: 3, fontSize: 18, color: '#000' }}><b>Create product!</b></Button>
          </form>
        </Paper>
      </Grid2>
    </>
  );
};

export default ProductCreate;