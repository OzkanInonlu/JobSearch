import { Box } from "@mui/material";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const NotFound = () => {
  return (
    <>
      <Navbar />

      <Box sx={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <h1>404 PAGE NOT FOUND</h1>
      </Box>

      <Footer />
    </>
  );
};

export default NotFound;
