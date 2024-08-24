import {motion} from 'framer-motion'
import { FaUserAlt } from "react-icons/fa";
import { Loader, Lock, User } from 'lucide-react';
import { useState } from 'react';
import { Mail } from 'lucide-react';
import Input from '../component/Input';
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordStrengthMeter from '../component/PasswordStrengthMeter';
import { useAuthStore } from '../store/authStore';

   const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [eye, setEye] = useState(false);
    const navigate = useNavigate();

    const { signup, error, isLoading } = useAuthStore();

    const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        await signup(email, password, name);
        navigate('/verify-email');
      } catch (error) {
          console.log(error);
      }
      console.log('Form submitted')
    }


  return (
    <motion.div initial={{opacity:0, y:20}}
    animate={{opacity:1, y:0}}
    transition={{duration: 0.5}}
    className='max-w-md bg-amber-300 bg-opacity-80 
    backdrop-filter backdrop-blur-xl rounded-2xl
    shadow-2xl overflow-hidden'
    >
    <div className='p-8 flex flex-col gap-2 items-center'>
      <h1 className='text-2xl  bg-gradient-to-t from-green-800 via-emerald-600 to-emerald-500 font-bold text-transparent bg-clip-text flex flex-col mb-5'>Signup Page</h1>
        <form onSubmit={handleSubmit} className='w-[380px]'>
          <Input icon={User} type="text" placeholder='Full Name...' value={name} onChange={(e) => setName(e.target.value)}/>
          <Input icon={Mail} type="email" placeholder='Email...' value={email} onChange={(e)=> setEmail(e.target.value)}/>
          <Input icon={Lock} type={eye ? "text" : "password"} max={15} placeholder='··············' value={password} onChange={(e)=> setPassword(e.target.value)}/>
          {eye ? <Eye  className='size-5 absolute text-green-400 right-[3.3rem] bottom-[18.4rem] cursor-pointer' onClick={() => setEye(!eye)}/> :
          <EyeOff  className='size-5 absolute text-green-400 right-[3.3rem] bottom-[18.4rem] cursor-pointer' onClick={() => setEye(!eye)}/>}
          {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
          <PasswordStrengthMeter password={password}/>
          <motion.button type='submit' className='flex w-full bg-gradient-to-r
        from-green-700 via-emerald-600
        to-emerald-500 text-xl justify-center
        text-white rounded-lg p-2 
          font-bold tracking-widest'
          whileHover={{scale: 1.02}}
          whileTap={{scale: 0.98}}
          disabled={isLoading}
          >
          {isLoading ? <Loader className='animate-spin mx-auto' /> : "Sign Up"}
          </motion.button>
        </form>
          <p className='bg-amber-800 w-[500px] -ml-8 text-center flex justify-center p-3 relative -bottom-8 gap-2'>Don{"'"}t Have an Account? 
          <Link to='/' className='underline underline-offset-2 text-white'>Login</Link>
           </p>
    </div>
    </motion.div>
  )
}

export default Signup