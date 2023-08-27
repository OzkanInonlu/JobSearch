import { Box, styled } from "@mui/material";
import headerImage from "../images/jobBg.png";
import SearchInput from "./SearchInput";
const Header = () => {
  //another way to apply styles
  //Box is like a div

  // const StyleHeader = styled(Box)({
  //   display:"flex",
  //   justifyContent: 'center',
  //   minHeight: "400px",
  //   backgroundImage: `url(${headerImage})`,
  //   backgroundSize: "cover",
  //   backgroundRepeat: "no-repeat",
  //   backgroundPosition: "center",
  //   backgroundColor: theme.palette.secondary.main;
  // });

  //OR

  const StyleHeader = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 400,
    backgroundImage: `url(${headerImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: theme.palette.secondary.main,
  }));
  return (
    <>
      <StyleHeader>
        <SearchInput />
      </StyleHeader>
    </>
  );
};

export default Header;
