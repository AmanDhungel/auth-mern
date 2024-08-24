import {motion} from 'framer-motion'
import Input from '../component/Input'
import { useState } from 'react'
import { useAuthStore } from '../store/authStore';
import { Loader, Lock } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
    const params =  useParams();
    console.log("params" , params)
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [passError, setPassError] = useState('');
    const {forgotPassword, isLoading, error, resetPassword} = useAuthStore();
    const navigate = useNavigate();


    async function handleResetPassword(e){
        e.preventDefault();
        try {
            if(password == '' || password !== cpassword){
               return setPassError('Password doesnot match');
            }
           await resetPassword(password, params.id);
           toast("Password Reset successfully!");
           setPassError('')
           navigate('/login')
        } catch (error) {
            console.log(error);
            toast.warn(error.message);
            throw new Error(error.message);
        }
    }

  return (
  <motion.div initial={{opacity:0, y:20}}
  animate={{opacity:1, y:0}}
  transition={{duration: 0.5}}
  className='max-w-md bg-amber-300 bg-opacity-80 
  backdrop-filter backdrop-blur-xl rounded-2xl
  shadow-2xl overflow-hidden p-4'>
    <h1 className='items-center text-2xl text-emerald-700 text-center mb-4'>Forgot Password</h1>
     <Input icon={Lock} type='password' placeholder='New Password'  value={password} onChange={(e) => setPassword(e.target.value)} />
     <Input icon={Lock} type='password' placeholder='Confirm Password'  onChange={(e) => setCPassword(e.target.value)} />
     <motion.button type='submit' className='flex w-full bg-gradient-to-r
        from-green-700 via-emerald-600
        to-emerald-500 text-xl justify-center
        text-white rounded-lg p-2 
          font-bold tracking-widest'
          whileHover={{scale: 1.02}}
          whileTap={{scale: 0.98}}
          disabled={isLoading}
          onClick={handleResetPassword}>
          {isLoading ? <Loader className='animate-spin mx-auto' /> : "Submit"}
          </motion.button>
     {error ? <p className='text-red-600 text-2xl'>{error}</p>: ''}
     {passError ? <p className='text-red-600 text-2xl'>Password doesnot match or is empty</p>: ''}
  </motion.div>
  
  )
}

export default ResetPassword