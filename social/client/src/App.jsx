import './App.css'
import { Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import Landing from './pages/Landing'
import { useSelector } from 'react-redux'
import useCurrentUser from './hooks/useCurrentuser'
import { Navigate } from 'react-router-dom'




function App() {
    useCurrentUser();
    const {userData} = useSelector(state=>state.user)
  return (
      <Routes>
        <Route path='/' element={!userData?<Landing/>:<Navigate to='/home'/> }/>
        <Route path='/signup' element={!userData?<SignUp/>:<Navigate to='/home'/>}/>
        <Route path='/signin' element={!userData?<SignIn/>:<Navigate to='/home'/>}/>
        <Route path='/forgot-password' element={!userData?<ForgotPassword/>:<Navigate to='/home'/>}/>
        <Route path='/home' element={userData?<Home/>:<Navigate to='/signin'/>}/>
      </Routes>
  )
}

export default App
