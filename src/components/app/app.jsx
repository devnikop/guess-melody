import PropTypes from "prop-types";
import React from "react";

import ArtistScreen from "../artist-screen/artist-screen.jsx";
import GameHeader from "../game-header/game-header.jsx";
import GenreScreen from "../genre-screen/genre-screen.jsx";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";

const Type = {
  ARTIST: `game--artist`,
  GENRE: `game--genre`,
};

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      question: -1,
    };

    this._onUserAnswerBinded = this._onUserAnswer.bind(this);
  }

  render() {
    return (
      <section className={`game ${Type.ARTIST}`}>
        <GameHeader />
        {this._getScreen(this._onUserAnswerBinded)}
      </section>
    );
  }

  _getScreen(onUserAnswer) {
    const { question: questionNumber } = this.state;

    if (questionNumber === -1) {
      const { errorCount, gameTime } = this.props;

      return (
        <WelcomeScreen
          errorCount={errorCount}
          onStartButtonClick={onUserAnswer}
          time={gameTime}
        />
      );
    }

    const currentQuestion = this.props.questions[questionNumber];
    switch (currentQuestion.type) {
      case `genre`:
        return (
          <GenreScreen question={currentQuestion} onAnswer={onUserAnswer} />
        );
      case `artist`:
        return (
          <ArtistScreen question={currentQuestion} onAnswer={onUserAnswer} />
        );
    }
    return null;
  }

  _onUserAnswer() {
    const { question } = this.state;
    const { questions } = this.props;

    this.setState({
      question: question + 1 >= questions.length ? -1 : question + 1,
    });
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
};

export default App;
