import { Component, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './pages/auth/login/login'
import Registration from './pages/auth/registration/registration'
import Wrapper from './pages/layout/wrapper/wrapper';

function App() {
  const public_router=[
    {
    path:"/",
    Component: <Login/>
    },
    {
      path:"/reg",
      Component: <Registration/>
      },

  ]

  return (
    <>
    <Router>
      <Wrapper>
        <Routes>
          {public_router.map((item)=>(
            <Route path={item.path} element={item.Component}/>
          ))}
        </Routes>
      </Wrapper>
    </Router>
      
    </>
  )
}

export default App