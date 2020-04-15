import React from "react";

import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";

const App = ({ gameTime, errorCount }) => {
  return <WelcomeScreen time={gameTime} errorCount={errorCount} />;
};

export default App;
