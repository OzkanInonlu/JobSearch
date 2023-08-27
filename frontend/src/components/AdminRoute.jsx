import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userSignIn);
  return userInfo && userInfo.role === 1 ? children : navigate("/"); //home page
};

export default AdminRoute;
