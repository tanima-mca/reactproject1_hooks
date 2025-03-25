// import { useEffect, useState } from "react";
// import {
//   Typography,
//   Card,
//   CardContent,
//   CardMedia,
//   Button,
//   CardActions,
//   Grid,
//   Box,
//   Pagination,
//   IconButton,
// } from "@mui/material";
// import toast from "react-hot-toast";
// import axiosInstance, { productt } from "../../../api/axios";
// import { endPoints } from "../../../api/endPoints";
// import SweetAlertComponent from "../../../ui/sweetAlert";
// import { Link, useNavigate } from "react-router-dom";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// const ProductList = () => {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [totalPages, setTotalPages] = useState(1);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [deleteId, setDeleteId] = useState(null);
//   const [modal, setModal] = useState(false);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setIsLoading(true);
//       const formData = new FormData();
//       formData.append("page", currentPage);
//       formData.append("perPage", 10);

//       try {
//         const response = await axiosInstance.post(
//           endPoints.products.list,
//           formData
//         );

//         if (response.status === 200) {
//           setProducts(response.data.data);
//           setTotalPages(response.data.totalPages || 1);
//         } else {
//           toast.error(response.data.message || "Failed to fetch products.");
//         }
//       } catch (error) {
//         toast.error(
//           error.message || "An error occurred while fetching products."
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [currentPage]);

//   const handleDelete = async () => {
//     const formData = new FormData();
//     formData.append("id", deleteId);

//     try {
//       const response = await axiosInstance.post(
//         endPoints.products.delete,
//         formData
//       );

//       if (response.status === 200) {
//         toast.success("Product deleted successfully!");

//         const updatedResponse = await axiosInstance.post(
//           endPoints.products.list,
//           {
//             page: currentPage,
//             perPage: 10,
//           }
//         );

//         setProducts(updatedResponse.data.data);
//         setTotalPages(updatedResponse.data.totalPages);

//         if (updatedResponse.data.data.length === 0 && currentPage > 1) {
//           setCurrentPage(currentPage - 1);
//         }
//       } else {
//         toast.error("Failed to delete product.");
//       }
//     } catch (error) {
//       toast.error(
//         error.message || "An error occurred while deleting the product."
//       );
//     } finally {
//       setModal(false);
//     }
//   };

//   const handlePageChange = (event, page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <>
//       <Typography
//         variant="h4"
//         align="center"
//         gutterBottom
//         sx={{ fontWeight: "bold", marginBottom: 4 }}
//       >
//         Product List
//       </Typography>

//       <Box
//         sx={{
//           maxWidth: "1300px",
//           margin: "0 auto",
//           padding: "0 16px",
//         }}
//       >
//         <Grid container spacing={4}>
//           {products.length > 0 ? (
//             products.map((product) => (
//               <Grid item xs={12} sm={6} md={4} key={product._id}>
//                 <Card
//                   sx={{
//                     transition:
//                       "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
//                     "&:hover": {
//                       transform: "scale(1.05)",
//                       boxShadow: 6,
//                     },
//                   }}
//                 >
//                   <CardMedia
//                     component="img"
//                     height="200"
//                     image={productt(product.image)}
//                     alt={product.title}
//                     sx={{ objectFit: "contain" }}
//                   />
//                   <CardContent>
//                     <Typography
//                       gutterBottom
//                       variant="h6"
//                       component="div"
//                       align="center"
//                     >
//                       {product.title}
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       color="text.secondary"
//                       align="center"
//                     >
//                       {product.description}
//                     </Typography>
//                   </CardContent>
//                   <CardActions>
//                     <Box
//                       display="flex"
//                       justifyContent="space-between"
//                       width="100%"
//                       sx={{
//                         padding: 1,
//                         border: "1px solid #ccc",
//                         borderRadius: "8px",
//                         gap: 2,
//                       }}
//                     >
//                       <Link
//                         to={`/product-details/${product._id}`}
//                         style={{ textDecoration: "none" }}
//                       >
//                         <Button variant="contained" size="medium">
//                           View Details
//                         </Button>
//                       </Link>
//                       <IconButton
//                         color="error"
//                         onClick={() => {
//                           setDeleteId(product._id);
//                           setModal(true);
//                         }}
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                       <Link
//                         to={`/pupdate/${product._id}`}
//                         style={{ textDecoration: "none" }}
//                       >
//                         <IconButton color="primary">
//                           <EditIcon />
//                         </IconButton>
//                       </Link>
//                     </Box>
//                   </CardActions>
//                 </Card>
//               </Grid>
//             ))
//           ) : (
//             <Typography align="center" width="100%">
//               {isLoading ? "Loading products..." : "No products found."}
//             </Typography>
//           )}
//         </Grid>
//         {modal && (
//           <SweetAlertComponent
//             confirm={handleDelete}
//             cancle={() => setModal(false)}
//             title="Are You Sure?"
//             subtitle="You will not be able to recover this product"
//             type="warning"
//           />
//         )}
//         {products.length !== 0 && (
//           <Box display="flex" justifyContent="center" mt={4}>
//             <Pagination
//               count={totalPages}
//               page={currentPage}
//               onChange={handlePageChange}
//             />
//           </Box>
//         )}
//         <Button
//           variant="contained"
//           onClick={() => navigate("/pcreate")}
//           sx={{
//             mt: 3,
//             mb: 3,
//             fontSize: 18,
//             color: "#000",
//             display: "block",
//             marginLeft: "auto",
//             marginRight: "auto",
//           }}
//         >
//           <b>Add product!</b>
//         </Button>
//       </Box>
//     </>
//   );
// };

// export default ProductList;


import { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  CardActions,
  Grid,
  Box,
  Pagination,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  FormControlLabel,
} from "@mui/material";
import toast from "react-hot-toast";
import axiosInstance, { productt } from "../../../api/axios";
import { endPoints } from "../../../api/endPoints";
import SweetAlertComponent from "../../../ui/sweetAlert";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [modal, setModal] = useState(false);
  const [isTableView, setIsTableView] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("page", currentPage);
      formData.append("perPage", 10);

      try {
        const response = await axiosInstance.post(
          endPoints.products.list,
          formData
        );

        if (response.status === 200) {
          setProducts(response.data.data);
          setTotalPages(response.data.totalPages || 1);
        } else {
          toast.error(response.data.message || "Failed to fetch products.");
        }
      } catch (error) {
        toast.error(
          error.message || "An error occurred while fetching products."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("id", deleteId);

    try {
      const response = await axiosInstance.post(
        endPoints.products.delete,
        formData
      );

      if (response.status === 200) {
        toast.success("Product deleted successfully!");

        const updatedResponse = await axiosInstance.post(
          endPoints.products.list,
          {
            page: currentPage,
            perPage: 10,
          }
        );

        setProducts(updatedResponse.data.data);
        setTotalPages(updatedResponse.data.totalPages);

        if (updatedResponse.data.data.length === 0 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } else {
        toast.error("Failed to delete product.");
      }
    } catch (error) {
      toast.error(
        error.message || "An error occurred while deleting the product."
      );
    } finally {
      setModal(false);
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const toggleView = () => {
    setIsTableView((prev) => !prev);
  };

  return (
    <>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", marginBottom: 4 }}
      >
        Product List
      </Typography>

      <Box
        sx={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding: "0 16px",
        }}
      >
        <FormControlLabel
          control={<Switch checked={isTableView} onChange={toggleView} />}
          label="Toggle Table View"
        />

        {isTableView ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>
                        <img
                          src={productt(product.image)}
                          alt={product.title}
                          style={{ height: "100px", objectFit: "contain" }}
                        />
                      </TableCell>
                      <TableCell>{product.title}</TableCell>
                      <TableCell>{product.description}</TableCell>
                      <TableCell align="center">
                        <Link
                          to={`/product-details/${product._id}`}
                          style={{ textDecoration: "none", marginRight: 8 }}
                        >
                          <Button variant="contained" size="small">
                            View
                          </Button>
                        </Link>
                        <IconButton
                          color="error"
                          onClick={() => {
                            setDeleteId(product._id);
                            setModal(true);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <Link
                          to={`/pupdate/${product._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <IconButton color="primary">
                            <EditIcon />
                          </IconButton>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      {isLoading ? "Loading products..." : "No products found."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Grid container spacing={4}>
            {products.length > 0 ? (
              products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product._id}>
                  <Card
                    sx={{
                      transition:
                        "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={productt(product.image)}
                      alt={product.title}
                      sx={{ objectFit: "contain" }}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        align="center"
                      >
                        {product.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center"
                      >
                        {product.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        width="100%"
                        sx={{
                          padding: 1,
                          border: "1px solid #ccc",
                          borderRadius: "8px",
                          gap: 2,
                        }}
                      >
                        <Link
                          to={`/product-details/${product._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Button variant="contained" size="medium">
                            View Details
                          </Button>
                        </Link>
                        <IconButton
                          color="error"
                          onClick={() => {
                            setDeleteId(product._id);
                            setModal(true);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <Link
                          to={`/pupdate/${product._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <IconButton color="primary">
                            <EditIcon />
                          </IconButton>
                        </Link>
                      </Box>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography align="center" width="100%">
                {isLoading ? "Loading products..." : "No products found."}
              </Typography>
            )}
          </Grid>
        )}

        {modal && (
          <SweetAlertComponent
            confirm={handleDelete}
            cancle={() => setModal(false)}
            title="Are You Sure?"
            subtitle="You will not be able to recover this product"
            type="warning"
          />
        )}
        {products.length !== 0 && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        )}
        <Button
          variant="contained"
          onClick={() => navigate("/pcreate")}
          sx={{
            mt: 3,
            mb: 3,
            fontSize: 18,
            color: "#000",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <b>Add product!</b>
        </Button>
      </Box>
    </>
  );
};

export default ProductList;


