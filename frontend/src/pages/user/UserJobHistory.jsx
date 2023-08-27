import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import CardElement from "../../components/CardElement";

const UserJobHistory = () => {
  const { user } = useSelector((state) => state.userProfile);
  

  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ color: "#fafafa", textAlign: "center" }}>
          Applied Jobs History
        </Typography>
        <Box>
          {user &&
            user.jobsHistory.map((job, i) => (
              <CardElement
                key={i}
                id={job._id}
                jobTitle={job.title}
                description={job.description}
                category={job.jobType ? job.jobType.jobTypeName : "No category"}
                location={job.location}
              />
            ))}
        </Box>
      </Box>
    </>
  );
};

export default UserJobHistory;
