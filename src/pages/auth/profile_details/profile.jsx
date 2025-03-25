import  { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress, Grid2 } from '@mui/material';
import axiosInstance, { profile_pic } from '../../../api/axios';
import { endPoints } from '../../../api/endPoints';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import image8 from "../../../assets/images/profileimg.jpg";

const ProfileDetails = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to view your profile");
        navigate("/");
        return;
      }

      try {
        const response = await axiosInstance.get( endPoints.auth.profiledetails,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setUserData(response.data.data);
        } else {
          toast.error("Failed to fetch profile data.");
        }
        // } catch (error) {
        //     toast.error('Error fetching profile details.');
        //     navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileDetails();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile_pic");
    navigate("/");
  };

  return (
    <Grid2
      container
      justifyContent="center"
      alignItems="center"
      style={{
        minHeight: "100vh",
        background: "#d1c4e9",
        backgroundImage: `url(${image8})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 600,
          margin: "0 auto",
          padding: 4,
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
          backgroundColor: "#ede7f6",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        <Typography variant="h4" align="center" mb={4}>
          Profile Details
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {userData ? (
              <>
                <Box
                  display="flex"
                  width="300px"
                  flexDirection="column"
                  alignItems="center"
                  mb={2}
                >
                  <img
                    src={profile_pic(userData.profile_pic)}
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      border: "2px solid #000",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                    alt={userData.title}
                  />
                  <Typography variant="h6" mt={2}>
                    First Name: {userData.first_name}
                  </Typography>
                  <Typography variant="h6" mt={2}>
                    Last Name: {userData.last_name}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" mt={2}>
                    Email: {userData.email}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleLogout}
                  sx={{ mt: 2 }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Typography variant="body1" color="textSecondary">
                No profile data available.
              </Typography>
            )}
          </>
        )}
      </Box>
    </Grid2>
  );
};

export default ProfileDetails;
