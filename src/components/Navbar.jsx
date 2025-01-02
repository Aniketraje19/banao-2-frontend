

import { NavLink } from 'react-router';
import { useAuth } from '../context/authContext';



export const Navbar = () => {
const {isAuthenticated,user,login,setIsAuthenticated,logout} = useAuth()

const logoutUser = () =>{
    setIsAuthenticated(false)
    login(null)
    logout()
}

return (
    <nav className="bg-gray-800 p-4 text-white rounded-full m-2 flex justify-between items-center">
        <NavLink className="px-4 text-5xl" to="/">Social-X</NavLink>


        {isAuthenticated ? 
        <span className='flex justify-center items-center'>
            <p className='text-xl mx-2'>{user?.username?.toUpperCase()}</p>
            <button className='bg-red-500 m-2 p-2 px-4 rounded-full' onClick={logoutUser}>Logout</button>
        </span> : <span>
          <NavLink 
            className="bg-blue-300 m-2 p-2 px-4 rounded-full hover:bg-transparent border border-blue-300" 
            to="/register" 
            end
          >
            Register
          </NavLink>
          <NavLink 
            className="bg-blue-300 m-2 p-2 px-4 rounded-full hover:bg-transparent border border-blue-300" 
            to="/login" 
            end
          >
            Login
          </NavLink>
        </span>}

        


      </nav>
)
}