/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";

const SelectComponent = ({ handleChangeCategory, cat }) => {
  const { jobType } = useSelector((state) => state.loadJobTypes);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" sx={{marginTop:1}}>Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={cat}
          label="Category"
          onChange={handleChangeCategory}
        >
          <MenuItem value="">All</MenuItem>
          {jobType && jobType.map((jobT, i) => (
              <MenuItem key={i} value={jobT._id}>
                {jobT.jobTypeName}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectComponent;
