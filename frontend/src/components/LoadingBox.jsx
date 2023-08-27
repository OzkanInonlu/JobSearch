import { Box, CircularProgress } from "@mui/material";

const LoadingBox = () => {
    return (
        <Box sx={{ 
            display: 'flex',
            minHeight: "500px",
            justifyContent: "center",
            alignItems: "center"
         }}>
          <CircularProgress />
        </Box>
      );
}

export default LoadingBox