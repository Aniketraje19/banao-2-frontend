
import {useAuth} from "../context/authContext"
import { Navigate } from "react-router"

export const Protected = ({children}) =>{

const {isAuthenticated} = useAuth()

return isAuthenticated ? children : <Navigate to="/login" />

}