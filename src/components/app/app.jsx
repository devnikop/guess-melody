import PropTypes from "prop-types";
import React from "react";

import GameHeader from "../game-header/game-header.jsx";

const Type = {
  ARTIST: `game--artist`,
  GENRE: `game--genre`,
};

const App = ({
  renderScreen
}) =>
  <section className={`game ${Type.ARTIST}`}>
    <GameHeader />
    {renderScreen()}
  </section>

App.propTypes = {
  renderScreen: PropTypes.func.isRequired,
}

export { App };
export default App;
