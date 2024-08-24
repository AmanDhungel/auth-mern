import { LogOut } from "lucide-react";
import { useAuthStore } from "../store/authStore";



const HomePage = () => {
    const {logout} = useAuthStore();
    async function handleLogout(e){
       e.preventDefault();
       await logout();
       location.reload();
    }
  return (
    <>
    <div>HomePage</div>
    <button className="text-2xl p-3 bg-emerald-400 rounded" onClick={handleLogout}>Logout</button>
    </>
  )
}

export default HomePage