import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import StudentSignIn from "./StudentSignIn";
import IndustrySignIn from "./IndustrySignIn";
import MetaData from "../MetaData"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
const Signin = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (<>
    <MetaData title="Sign In"/>
    <Box sx={{ padding: "0px", width: "100%", height: "90vh" }}>
      <Box display="flex" justifyContent="center">
        <Tabs
          position="fixed"
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          sx={{ width: '55%', diplay: 'flex', justifyContent: 'center', textAlign: 'center', border: 'none', outline: 'none' }}
        >
          <Tab label="Student Log In" {...a11yProps(0)} />
          <Tab label="Industry Log In" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <Box display="flex" justifyContent="center">
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <StudentSignIn />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <IndustrySignIn />
          </TabPanel>
        </SwipeableViews>
      </Box>
    </Box>
  </>
  );
};

export default Signin;
