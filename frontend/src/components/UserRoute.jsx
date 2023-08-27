import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserRoute = ({ children }) => { //children -> UserDashboard
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userSignIn);
  return userInfo ? children : navigate("/"); //home page
};

export default UserRoute;
