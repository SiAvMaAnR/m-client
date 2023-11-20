import { useNavigate, Outlet } from "react-router-dom";
import useRole from '../hooks/useRole';


const AuthRoute = ({ roles }) => {
    const navigate = useNavigate()
    const userRole = useRole()
    
    const isAccess = roles.includes(userRole)

    return isAccess
        ? <Outlet />
        : navigate("/login")
}

export default AuthRoute