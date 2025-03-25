import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Registration from './pages/auth/registration/registration'
import Wrapper from './pages/layout/wrapper/wrapper';
import Login from './pages/auth/login/login';
import ProductCreate from './pages/products/product_create/productcreate';
import ProductList from './pages/products/product_list/productlist';
import ProductDetails from './pages/products/product_details/productdetails';
import ProfileDetails from './pages/auth/profile_details/profile';
import ProductUpdate from './pages/products/product_update/productupdate';
import toast from 'react-hot-toast';
import Home from './pages/home/home';


function Private_router({ children }) {
  const token = localStorage.getItem('token')

  return token != null || token != undefined ? (
    children

  ) : (
    <>
      <Navigate to={'/'} />
      {toast.success("Login First")};
    </>
  )
}
function App() {
 
  const public_router = [
    {
      path: "/",
      Component: <Login />
    },
    {
      path: "/reg",
      Component: <Registration />
    },
    
  ]
  const private_router = [
    {
      path: "/home",
      Component: <Home/>
    },

    {
      path: "/profile",
      Component: <ProfileDetails />
    },
    {
      path: "/pcreate",
      Component: <ProductCreate />
    },
    {
      path: "/plist",
      Component: <ProductList />
    },
    {
      path: "/product-details/:id",
      Component: <ProductDetails />
    },
    {
      path: "/pupdate/:id",
      Component: <ProductUpdate />
    },

  ]

  return (
    <>
      <Router>
        <Wrapper>
          <Routes>
            {public_router.map((item,index) => (
              <Route key={index} path={item.path} element={item.Component} />
            ))}
          </Routes>

          <Routes>
            {private_router.map((item,index) => (
              <Route key={index} path={item.path} element={<Private_router>{item.Component}</Private_router>} />
            ))}
          </Routes>
        </Wrapper>
      </Router>
    </>
  )
}

export default App


// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useState } from "react";
// import toast from "react-hot-toast";

// import "./App.css";
// import Registration from "./pages/auth/registration/registration";
// import Wrapper from "./pages/layout/wrapper/wrapper";
// import Login from "./pages/auth/login/login";
// import ProductCreate from "./pages/products/product_create/productcreate";
// import ProductList from "./pages/products/product_list/productlist";
// import ProductDetails from "./pages/products/product_details/productdetails";
// import ProfileDetails from "./pages/auth/profile_details/profile";
// import ProductUpdate from "./pages/products/product_update/productupdate";
// import Header from "./pages/layout/header/header";

// function Private_router({ children }) {
//   const token = localStorage.getItem('token')

//   return token != null || token != undefined ? (
//     children

//   ) : (
//     <>
//       <Navigate to={'/'} />
//       {toast.success("Login First")};
//     </>
//   )
// }

// function App() {
//   const [profilePic, setProfilePic] = useState(
//     localStorage.getItem("profile_pic") || null
//   );

//   const handleLogin = (profilePicUrl) => {
//     setProfilePic(profilePicUrl);
//   };

//   const handleLogout = () => {
//     setProfilePic(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("profile_pic");
//     localStorage.removeItem("isLoggedIn");
//   };

//   const publicRoutes = [
//     { path: "/", component: <Login onLogin={handleLogin} /> },
//     { path: "/reg", component: <Registration /> },
//   ];

//   const privateRoutes = [
//     { path: "/profile", component: <ProfileDetails onLogout={handleLogout} /> },
//     { path: "/pcreate", component: <ProductCreate /> },
//     { path: "/plist", component: <ProductList /> },
//     { path: "/product-details/:id", component: <ProductDetails /> },
//     { path: "/pupdate/:id", component: <ProductUpdate /> },
//   ];

//   return (
//     <Router>
//       <Wrapper>
//         <Header profilePic={profilePic} />
//         <Routes>
//           {publicRoutes.map((route, index) => (
//             <Route key={index} path={route.path} element={route.component} />
//           ))}
//           {privateRoutes.map((route, index) => (
//             <Route
//               key={index}
//               path={route.path}
//               element={<Private_router>{route.component}</Private_router>}
//             />
//           ))}
//         </Routes>
//       </Wrapper>
//     </Router>
//   );
// }

// export default App;
