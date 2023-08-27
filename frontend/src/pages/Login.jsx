import { Avatar, Box } from "@mui/material";
import { useEffect } from "react";
import Footer from "../components/Footer";
//import LockClockOutlined from "@mui/icons-material/LockClockOutlined";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { userSignInAction } from "../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoginIcon from '@mui/icons-material/Login';

const validationSchema = yup.object({
  // for name="email" field below
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  // for name="password" field below
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, userInfo } = useSelector((state) => state.userSignIn);

  //console.log("isAuthenticated", isAuthenticated);

  useEffect(() => {
    // if (isAuthenticated) {
    //   navigate("/user/dashboard");
    // }
    if(isAuthenticated) {
      if(userInfo.role === 1){
        navigate("/admin/dashboard");
      }
      else{
        navigate("/user/dashboard");
      }
    }
  }, [isAuthenticated]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      //alert(JSON.stringify(values, null, 2));
      dispatch(userSignInAction(values));
      actions.resetForm();
    },
  });

  return (
    <>
      <Navbar />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          onSubmit={formik.handleSubmit}
          component="form"
          className="form_style border-style"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main", mb: 3 }}>
              <LoginIcon />
            </Avatar>
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="example@gmail.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="example123"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <Button fullWidth variant="contained" type="submit" color="success">
              Log In
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Login;
