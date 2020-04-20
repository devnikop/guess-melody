import PropTypes from "prop-types";
import React from "react";

import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";

const App = ({ gameTime, errorCount }) => {
  return <WelcomeScreen time={gameTime} errorCount={errorCount} />;
};

App.propTypes = {
  gameTime: PropTypes.number.isRequired,
  errorCount: PropTypes.number.isRequired,
};

export default App;
