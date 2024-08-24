import {motion} from 'framer-motion'
import Input from '../component/Input'
import { useState } from 'react'
import { useAuthStore } from '../store/authStore';
import { Loader, Mail, User } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const {forgotPassword, isLoading} = useAuthStore();

    async function handleForgotPassword(e){
         e.preventDefault();
        await forgotPassword(email);
        toast("Email Sent successfully!");
    }

  return (
  <motion.div initial={{opacity:0, y:20}}
  animate={{opacity:1, y:0}}
  transition={{duration: 0.5}}
  className='max-w-md bg-amber-300 bg-opacity-80 
  backdrop-filter backdrop-blur-xl rounded-2xl
  shadow-2xl overflow-hidden p-4'>
    <h1 className='items-center text-2xl text-emerald-700 text-center mb-4'>Forgot Password</h1>
     <Input icon={Mail} type='email' autoComplete='email' placeholder='Email'  value={email} onChange={(e) => setEmail(e.target.value)} />
     <motion.button type='submit' className='flex w-full bg-gradient-to-r
        from-green-700 via-emerald-600
        to-emerald-500 text-xl justify-center
        text-white rounded-lg p-2 
          font-bold tracking-widest'
          whileHover={{scale: 1.02}}
          whileTap={{scale: 0.98}}
          disabled={isLoading}
          onClick={handleForgotPassword}>
          {isLoading ? <Loader className='animate-spin mx-auto' /> : "Submit"}
          </motion.button>
  </motion.div>
  )
}

export default ForgotPassword