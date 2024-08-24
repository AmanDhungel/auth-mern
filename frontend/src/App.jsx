import { Link, Navigate, Route, Routes } from "react-router-dom"
import FloatingShape from "./component/FloatingShape"
import Signup from "./pages/Signup"
import LoginPage from "./pages/LoginPage"
import EmailVerificationPage from "./pages/EmailVerificationPage"
import { useAuthStore } from "./store/authStore"
import { useEffect } from "react"
import HomePage from "./pages/HomePage"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { SmileIcon } from "lucide-react"

const RedirectProtectedRoute = ({children}) => {
  const {isAuthenticated, user} = useAuthStore();
  if(!isAuthenticated && !user){
    return <Navigate to="/login" replace={true} />
  }
  return children
}

const RedirectAuthenticatedUser = ({children}) => {
  const {isAuthenticated, user} = useAuthStore();

  if(isAuthenticated && user){
    return <Navigate to="/home" replace={true} />
  }

  return children;
}

function App() {
  const{isCheckingAuth, checkAuth, isAuthenticated, user} = useAuthStore();

  useEffect(()=> {
    checkAuth();
  }, [checkAuth])

  console.log("isAuthenticated", isAuthenticated)
  console.log("user", user)

  return (
    <>
  <div className="min-h-screen  bg-gradient-to-br from-amber-900 via-amber-400 to-amber-300 flex items-center justify-center relative overflow-hidden">
  <FloatingShape color="bg-rose-900" size="w-64 h-64" top="-5%" left="10%" delay={0}/>
  <FloatingShape color="bg-red-900" size="w-48 h-48" top="70%" left="80%" delay={5}/>
  <FloatingShape color="bg-red-900" size="w-32 h-32" top="40%" left="-10%" delay={2}/>
  <div className="flex flex-col">
  <ToastContainer />
  <Routes>
    <Route path="/home" element={<RedirectProtectedRoute>
      <HomePage/>
      </RedirectProtectedRoute>
      } />
    <Route path="/" element={
      <RedirectAuthenticatedUser>
      <LoginPage/>
      </RedirectAuthenticatedUser>
      } />
    <Route path="/signup" element={
      <RedirectAuthenticatedUser>
        <Signup/>
        </RedirectAuthenticatedUser>
      } />
    <Route path="/verify-email" element={<EmailVerificationPage/>} />
    <Route path="/forgot-password" element={<ForgotPassword/>} />
    <Route path="/reset-password/:id" element={<ResetPassword/>} />
    <Route path="*" element={<div className="bg-black w-screen h-screen flex justify-center items-center text-3xl italic text-white gap-3">404 Not Found<SmileIcon className="size-10 text-amber-500"/><Link to="/" className="bg-emerald-500 rounded-lg p-3">back to Login</Link></div>} />
  </Routes>
  
  </div>  
  </div>
    </>
  )
}

export default App
