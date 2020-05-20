import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

import withActivePlayer from "../../hocs/with-active-player/with-active-player.jsx";
import withAnswers from "../../hocs/with-answers/with-answers.jsx";

import ArtistScreen from "../artist-screen/artist-screen.jsx";
import GameHeader from "../game-header/game-header.jsx";
import GenreScreen from "../genre-screen/genre-screen.jsx";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";

const GenreScreenWrapped = withActivePlayer(withAnswers(GenreScreen));

const Type = {
  ARTIST: `game--artist`,
  GENRE: `game--genre`,
};

class App extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className={`game ${Type.ARTIST}`}>
        <GameHeader />
        {this._getScreen(this._onUserAnswerBinded)}
      </section>
    );
  }

  _getScreen() {
    const { questionStep } = this.props;

    if (questionStep === -1) {
      const { errorCount, gameTime } = this.props;

      return (
        <WelcomeScreen
          errorCount={errorCount}
          time={gameTime}
        />
      );
    }

    const currentQuestion = this.props.questions[questionStep];
    switch (currentQuestion.type) {
      case `genre`:
        return (
          <GenreScreenWrapped
            key={`genre-${questionStep}`}
            question={currentQuestion}
          />
        );
      case `artist`:
        return (
          <ArtistScreen
            key={`artist-${questionStep}`}
            question={currentQuestion}
          />
        );
    }
    return null;
  }
}

App.propTypes = {
  errorCount: PropTypes.number.isRequired,
  gameTime: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      answers: PropTypes.arrayOf(
        PropTypes.shape({
          artist: PropTypes.string,
          genre: PropTypes.oneOf([`rock`, `pop`, `jazz`]),
          picture: PropTypes.string,
          src: PropTypes.string,
        })
      ).isRequired,
      genre: PropTypes.oneOf([`rock`, `pop`, `jazz`]),
      song: PropTypes.shape({
        artist: PropTypes.string,
        src: PropTypes.string,
      }),
      type: PropTypes.oneOf([`genre`, `artist`]).isRequired,
    })
  ).isRequired,
  questionStep: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions,
  questionStep: state.currentQuestion,
});

export { App };
export default connect(mapStateToProps)(App);
