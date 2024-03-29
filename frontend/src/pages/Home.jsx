/* eslint-disable no-unused-vars */
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import {
  Box,
  Card,
  Container,
  ListItemIcon,
  MenuItem,
  MenuList,
  Pagination,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { jobLoadAction } from "../redux/actions/jobAction";
import { Link, useParams } from "react-router-dom";
import CardElement from "../components/CardElement";
import Footer from "../components/Footer";
import LoadingBox from "../components/LoadingBox";
import SelectComponent from "../components/SelectComponent";
import { jobTypeLoadAction } from "../redux/actions/jobTypeAction";
import LocationOnIcon from '@mui/icons-material/LocationOn';


const Home = () => {
  const { jobs, locationSet, pages, loading } = useSelector(
    (state) => state.loadJobs
  );
  const { palette } = useTheme(); //mui hook
  const dispatch = useDispatch(); //react-redux hook

  const [page, setPage] = useState(1);
  const [cat, setCat] = useState("");
  const { keyword, location } = useParams();

  useEffect(() => {
    dispatch(jobLoadAction(page, keyword, cat, location));
  }, [page, keyword, cat, location]);

  useEffect(() => {
    dispatch(jobTypeLoadAction());
  }, []);

  const handleChangeCategory = (event) => {
    setCat(event.target.value);
  };

  return (
    <>
      <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>
        <Navbar />
        <Header />
        <Container>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Box sx={{ flex: 2, padding: 2 }}>
              <Card
                sx={{
                  minWidth: 150,
                  marginBottom: 3,
                  marginTop: 3,
                  padding: 2,
                }}>
                <Box sx={{ paddingBottom: 2 }}>
                  <Typography
                    component="h4"
                    sx={{ color: palette.primary.main, fontWeight: "600" }}
                  >
                    Filter jobs by category
                  </Typography>

                  <SelectComponent
                    handleChangeCategory={handleChangeCategory}
                    cat={cat}
                  />
                </Box>
              </Card>

              {/* Filter jobs by location */}

              <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2 }}>
                <Box sx={{ pb: 2 }}>
                  <Typography
                    component="h4"
                    sx={{ color: palette.primary.main, fontWeight: 600 }}
                  >
                    Filter jobs by location
                  </Typography>
                  <MenuList>
                    {locationSet && locationSet.map((location, i) => (
                        <MenuItem key={i}>
                          <ListItemIcon>
                            <LocationOnIcon
                              sx={{
                                color: palette.secondary.main,
                                fontSize: 18,
                              }}/>
                          </ListItemIcon>
                          <Link to={`/search/location/${location}`}>
                            {location}
                          </Link>
                        </MenuItem>
                      ))}
                  </MenuList>
                </Box>
              </Card>
            </Box>
            <Box sx={{ flex: 5, padding: 2 }}>
              {loading ? (
                <LoadingBox />
              ) : jobs && jobs.length === 0 ? (
                <Box
                  sx={{
                    minHeight: "350px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h2>No results found</h2>
                </Box>
              ) : (
                jobs && jobs.map((job, i) => (
                  <CardElement
                    key={i}
                    jobTitle={job.title}
                    description={job.description}
                    category={
                      job.jobType ? job.jobType.jobTypeName : "No Category"
                    }
                    location={job.location}
                    id={job._id}
                  />
                ))
              )}
              <Stack spacing={2}>
                <Pagination
                  page={page}
                  count={pages === 0 ? 1 : pages}
                  onChange={(event, value) => setPage(value)}
                />
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default Home;
