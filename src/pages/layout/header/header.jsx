import { useState, useEffect } from "react";
import { AppBar, Box, Button, IconButton, Toolbar, Typography, Menu, MenuItem, Drawer, List, ListItem, ListItemText, ListItemButton, Collapse, Avatar } from "@mui/material";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import MenuIcon from "@mui/icons-material/Menu";
import { Link,useNavigate} from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const Header = () => {
  const navigate = useNavigate(); 
  const [productMenuAnchor, setProductMenuAnchor] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateProfilePic = () => {
    const storedProfilePic = localStorage.getItem("profile_pic");
    setProfilePic(storedProfilePic ? storedProfilePic : "");
  };

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("profile_pic");
    localStorage.removeItem("isLoggedIn");
    setProfilePic(null);
    setIsLoggedIn(false);
    navigate("/")
  };
  

  useEffect(() => {
    updateProfilePic();

    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(storedLoginStatus === "true");

    const handleProfilePicChange = () => {
      updateProfilePic();
    };

    window.addEventListener("updateProfilePic", handleProfilePicChange);

    return () => {
      window.removeEventListener("updateProfilePic", handleProfilePicChange);
    };
  }, []);

  useEffect(() => {
    const loginStatusChangeListener = () => {
      const storedLoginStatus = localStorage.getItem("isLoggedIn");
      setIsLoggedIn(storedLoginStatus === "true");
    };

    window.addEventListener("loginStatusChanged", loginStatusChangeListener);

    return () => {
      window.removeEventListener("loginStatusChanged", loginStatusChangeListener);
    };
  }, []);

  const productSubItems = [
    { name: "Product Create", path: "/pcreate" },
    { name: "Product List", path: "/plist" },
    { name: "Product Details", path: "/product-details/:id" },
    { name: "Product Update", path: "/pupdate" },
  ];

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const handleProductMenuToggle = () => {
    setIsProductMenuOpen((prevOpen) => !prevOpen);
  };

  const drawerList = (
    <Box
      sx={{
        width: "100vw",
        paddingTop: "10px",
        paddingBottom: "10px",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItemButton onClick={handleProductMenuToggle}>
          <ListItemText primary="Product" />
          {isProductMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={isProductMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {productSubItems.map((item) => (
              <ListItem key={item.name} sx={{ pl: 4 }}>
                <Link to={item.path} style={{ textDecoration: "none", color: "inherit" }}>
                  <ListItemText primary={item.name} />
                </Link>
              </ListItem>
            ))}
          </List>
        </Collapse>
        <ListItem>
          {isLoggedIn ? (
            <Button onClick={handleLogout} style={{ textDecoration: "none", color: "inherit" }}>
              Logout
            </Button>
          ) : (
            <Button onClick={handleLogin} style={{ textDecoration: "none", color: "inherit" }}>
              Sign In
            </Button>
          )}
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "#2196f3" }}>
        <Toolbar>
        <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
          <IconButton size="large" edge="start" color="inherit" aria-label="logo">
            <ProductionQuantityLimitsIcon />
          </IconButton>
          </Link>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            My Beauty Product App
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
            <Button color="inherit" onMouseEnter={(e) => setProductMenuAnchor(e.currentTarget)} aria-controls="product-menu" aria-haspopup="true">
              Product
            </Button>
            <Menu id="product-menu" anchorEl={productMenuAnchor} open={Boolean(productMenuAnchor)} onClose={() => setProductMenuAnchor(null)} MenuListProps={{ onMouseLeave: () => setProductMenuAnchor(null) }} sx={{ mt: 1 }}>
              {productSubItems.map((item) => (
                <MenuItem key={item.name} onClick={() => setProductMenuAnchor(null)} component={Link} to={item.path}>
                  {item.name}
                </MenuItem>
              ))}
            </Menu>
            {isLoggedIn ? (
              <Button onClick={handleLogout} color="inherit">
                Logout
              </Button>
            ) : (
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                <Button onClick={handleLogin} color="inherit">
                  Sign In
                </Button>
              </Link>
            )}
          </Box>

          <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
            {profilePic ? <Avatar src={profilePic} sx={{ width: 40, height: 40 }} /> : <Avatar sx={{ bgcolor: "primary.main" }}>?</Avatar>}
          </Link>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={isDrawerOpen} onClose={toggleDrawer(false)} PaperProps={{ sx: { width: "100vw", margin: 0, padding: 0, overflowX: "hidden" } }}>
              {drawerList}
            </Drawer>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;

// import { useState } from "react";
// import {
//   AppBar,
//   Box,
//   Button,
//   IconButton,
//   Toolbar,
//   Typography,
//   Menu,
//   MenuItem,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemButton,
//   Collapse,
//   Avatar,
// } from "@mui/material";
// import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
// import MenuIcon from "@mui/icons-material/Menu";
// import { Link, useNavigate } from "react-router-dom";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";

// const Header = ({ profilePic }) => {
//   const navigate = useNavigate();
//   const [productMenuAnchor, setProductMenuAnchor] = useState(null);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   const productSubItems = [
//     { name: "Product Create", path: "/pcreate" },
//     { name: "Product List", path: "/plist" },
//     { name: "Product Details", path: "/product-details/:id" },
//     { name: "Product Update", path: "/pupdate/:id" },
//   ];

//   const toggleDrawer = (open) => (event) => {
//     if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
//       return;
//     }
//     setIsDrawerOpen(open);
//   };

//   const handleProductMenuToggle = () => {
//     setIsProductMenuOpen((prevOpen) => !prevOpen);
//   };

//   const drawerList = (
//     <Box
//       sx={{ width: "100vw", padding: "10px", boxSizing: "border-box" }}
//       role="presentation"
//       onClick={toggleDrawer(false)}
//       onKeyDown={toggleDrawer(false)}
//     >
//       <List>
//         <ListItemButton onClick={handleProductMenuToggle}>
//           <ListItemText primary="Product" />
//           {isProductMenuOpen ? <ExpandLess /> : <ExpandMore />}
//         </ListItemButton>
//         <Collapse in={isProductMenuOpen} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             {productSubItems.map((item) => (
//               <ListItem key={item.name} sx={{ pl: 4 }}>
//                 <Link to={item.path} style={{ textDecoration: "none", color: "inherit" }}>
//                   <ListItemText primary={item.name} />
//                 </Link>
//               </ListItem>
//             ))}
//           </List>
//         </Collapse>
//         <ListItem>
//           <Button onClick={handleLogout} style={{ textDecoration: "none", color: "inherit" }}>
//             Logout
//           </Button>
//         </ListItem>
//       </List>
//     </Box>
//   );

//   return (
//     <AppBar position="static" style={{ backgroundColor: "#2196f3" }}>
//       <Toolbar>
//         <IconButton size="large" edge="start" color="inherit" aria-label="logo">
//           <ProductionQuantityLimitsIcon />
//         </IconButton>
//         <Typography
//           variant="h5"
//           component="div"
//           sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
//         >
//           My Beauty Product App
//         </Typography>

//         <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
//           <Button
//             color="inherit"
//             onMouseEnter={(e) => setProductMenuAnchor(e.currentTarget)}
//             aria-controls="product-menu"
//             aria-haspopup="true"
//           >
//             Product
//           </Button>
//           <Menu
//             id="product-menu"
//             anchorEl={productMenuAnchor}
//             open={Boolean(productMenuAnchor)}
//             onClose={() => setProductMenuAnchor(null)}
//             MenuListProps={{ onMouseLeave: () => setProductMenuAnchor(null) }}
//             sx={{ mt: 1 }}
//           >
//             {productSubItems.map((item) => (
//               <MenuItem key={item.name} onClick={() => setProductMenuAnchor(null)} component={Link} to={item.path}>
//                 {item.name}
//               </MenuItem>
//             ))}
//           </Menu>
//           <Button onClick={handleLogout} color="inherit">
//             Logout
//           </Button>
//         </Box>

//         <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
//           {profilePic ? (
//             <Avatar src={profilePic} sx={{ width: 40, height: 40 }} />
//           ) : (
//             <Avatar sx={{ bgcolor: "primary.main" }}>?</Avatar>
//           )}
//         </Link>

//         <Box sx={{ display: { xs: "flex", md: "none" } }}>
//           <IconButton size="large" color="inherit" onClick={toggleDrawer(true)}>
//             <MenuIcon />
//           </IconButton>
//           <Drawer anchor="top" open={isDrawerOpen} onClose={toggleDrawer(false)}>
//             {drawerList}
//           </Drawer>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;
