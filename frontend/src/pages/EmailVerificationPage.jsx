import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";

const CODE_LENGTH = 6; // Define the length of the code

const EmailVerificationPage = () => {
  const [code, setCode] = useState(Array(CODE_LENGTH).fill("")); 
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const newCode = [...code];
    const valueToSet = value.slice(0, CODE_LENGTH); 

    if (valueToSet.length === CODE_LENGTH) {
      setCode(valueToSet.split(""));
      inputRefs.current[CODE_LENGTH - 1].focus(); 
    } else {
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const { error, isLoading, verification } = useAuthStore();
  const handleSubmit = async(e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    console.log(verificationCode);
    await verification(verificationCode);
    navigate("/login");
    // Submit code logic
    // navigate('/next-page') after verification
  };

  useEffect(() => {
  if(code.every(digit => digit !== "")){
    handleSubmit(new Event('submit'))
  }
  }, [code])

  return (
    <motion.div className="max-md w-[25rem] bg-gray-800 bg-opacity-50 p-5 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
        Email Verification
      </h2>
      <p className="text-center text-gray-300 mb-6">Enter the 6-digit code sent to your Email.</p>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-evenly mb-5">
          {code.map((digit, index) => (
            <input
              type="text"
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none"
            />
          ))}
        </div>
        <motion.button
          type="submit"
          className="flex w-[15rem] ml-auto mr-auto mb-2 bg-gradient-to-r from-green-700 via-emerald-600 to-emerald-500 text-xl justify-center text-white rounded-lg p-2 font-bold tracking-widest"
          disabled={isLoading || code.some((digit) => !digit)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : "Verify"}
        </motion.button>
      {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
      </form>
    </motion.div>
  );
};

export default EmailVerificationPage;
