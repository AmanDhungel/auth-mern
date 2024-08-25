import {motion} from 'framer-motion';
import Input from '../component/Input';
import { Lock, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Loader } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-toastify';
const LoginPage = () => {
  const navigate = useNavigate();
const [email, setEmail] = useState()
const [password, setPassword] = useState()

const {error, login, isLoading} = useAuthStore();

async function  handleLogin(e){
e.preventDefault();
try {
  await login(email, password);
} catch (error) {
  toast.warn("password or email doesnot exist")
  navigate('/')
  console.log(error.message)
}
navigate('/home');
}


  return (
<motion.div initial={{opacity:0, y:20}}
    animate={{opacity:1, y:0}}
    transition={{duration: 0.5}}
    className='max-w-md bg-amber-300 bg-opacity-80 
    backdrop-filter backdrop-blur-xl rounded-2xl
    shadow-2xl overflow-hidden'
    >
    <div className='p-8'>
    <form onSubmit={handleLogin}>
    <h2 className='tex-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-embrald-500 text-transparent bg-clip-text flex flex-col '>
      <h1 className='text-2xl  bg-gradient-to-t from-green-800 via-emerald-600 to-emerald-500 font-bold text-transparent bg-clip-text flex flex-col mb-5'>Login Page</h1>
        <Input icon={User} type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <Input icon={Lock} type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <Link to="/forgot-password" className='text-green-500 text-start'>Forgot password?</Link>
    </h2>
    <motion.button type='submit' className='flex w-full bg-gradient-to-r
         from-green-700 via-emerald-600
         to-emerald-500 text-xl justify-center
          text-white rounded-lg p-2 
          font-bold tracking-widest'
          disabled={isLoading}
          whileHover={{scale: 1.02}}
          whileTap={{scale: 0.98}}>{isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto' /> : "Login"}</motion.button>
          {error && <p className='text-red-500 text-2xl'> {error}</p>}
      </form>
    <p className='bg-amber-800 w-[450px] -ml-8 text-center flex justify-center p-3 relative -bottom-8 gap-2'>
    Don{"'"}t Have an Account?
    <Link to='/signup' className='underline underline-offset-2 text-white'>Signup</Link> </p>
    </div>
    </motion.div>
  )
}

export default LoginPage