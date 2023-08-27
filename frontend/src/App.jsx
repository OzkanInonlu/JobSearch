import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import UserDashboard from "./pages/user/UserDashboard";
import UserRoute from "./components/UserRoute";
import Layout from "./pages/global/Layout";
import { ProSidebarProvider } from "react-pro-sidebar"; // we need this for displaying the sidebar
import UserJobHistory from "./pages/user/UserJobHistory";
import UserInfoDashboard from "./pages/user/UserInfoDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import SingleJob from "./pages/SingleJob";
import DashUsers from "./pages/admin/DashUsers";
import DashJobs from "./pages/admin/DashJobs";

// Higher Order Component -> Layout
const UserDashboardHOC = Layout(UserDashboard);
const UserJobHistoryHOC = Layout(UserJobHistory);
const UserInfoDashboardHOC = Layout(UserInfoDashboard);
const AdminDashboardHOC = Layout(AdminDashboard);
const DashUsersHOC = Layout(DashUsers);
const DashJobsHOC = Layout(DashJobs);

function App() {
  return (
    <>
      <ToastContainer />

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ProSidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/search/location/:location" element={<Home />}></Route>
            <Route path="/search/:keyword" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/user/dashboard" element={<UserRoute><UserDashboardHOC /></UserRoute>}></Route>
            <Route path='/user/jobs' element={<UserRoute>< UserJobHistoryHOC /></UserRoute>} />
            <Route path='/user/info' element={<UserRoute>< UserInfoDashboardHOC /></UserRoute>} />
            <Route path='/admin/dashboard' element={<AdminRoute>< AdminDashboardHOC /></AdminRoute>}/>
            <Route path='/admin/users' element={<AdminRoute>< DashUsersHOC /></AdminRoute>}/>
            <Route path='/admin/jobs' element={<AdminRoute>< DashJobsHOC /></AdminRoute>}/>
            <Route path="/job/:id" element={<SingleJob />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
        </ProSidebarProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
