/* eslint-disable react-refresh/only-export-components */
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './layout/Landing'
import 'bootstrap/dist/css/bootstrap.css'
import NavBar from './layout/Navbar'
import LoginPage from './layout/Login'
import RegisterPage from './layout/Register'
import DashboardLayout from './layout/Dashboard'
import AIModal from './layout/AI'
import { ConnectedProps, connect } from 'react-redux'
import { loadUser } from './actions/user'
import React, { useEffect } from 'react'
import setAuthToken from './utils/setAuthToken'
import ProtectedRoutes from './utils/ProtectedRoutes'
import Loading from './layout/Loading'
import Recipe from './layout/Recipe'

if (localStorage.token) setAuthToken(localStorage.token);

// const mapStateToProps = (state: State) => ({
// 	ingredientId: state.modal.ingredient.id,
// 	confirmShow: state.modal.confirm.show,
// });

const connector = connect(null, {loadUser});

type Props = ConnectedProps<typeof connector>;

const App: React.FC<Props> = ({loadUser}) => {
  useEffect(() => {
    loadUser()
  }, [loadUser]);

  return (
    <BrowserRouter>
      <NavBar />
      <LoginPage />
      <RegisterPage />
      <AIModal />
      <Loading />
      <Routes>
        <Route element={<ProtectedRoutes Protected={false} />}>
          <Route path='/' element={<LandingPage />} />
        </Route>
        <Route element={<ProtectedRoutes Protected={true} />}>
          <Route path='/dashboard' element={<DashboardLayout />} />
          <Route path='/recipe/:id' element={<Recipe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default connector(App);
