import React from 'react';
import propTypes from 'prop-types';

import {WelcomeScreen} from '../welcome-screen/welcome-screen.jsx';
import {GenreQuestionScreen} from '../genre-question-screen/genre-question-screen.jsx';
import {ArtistQuestionScreen} from '../artist-question-screen/artist-question-screen.jsx';

export class App extends React.PureComponent {
  static getScreen(question, props, onUserAnswer) {
    if (question === -1) {
      const {
        gameTime,
        errorCount,
      } = props;

      return <WelcomeScreen
        time={gameTime}
        errorCount={errorCount}
        onStartButtonClick={onUserAnswer}
      />;
    }

    const {questions} = props;
    const currentQuestion = questions[question];

    switch (currentQuestion.type) {
      case `genre`: return <GenreQuestionScreen
        genre={currentQuestion.genre}
        answers={currentQuestion.answers}
        onAnswer={onUserAnswer}
      />;

      case `artist`: return <ArtistQuestionScreen
        song={currentQuestion.song}
        answers={currentQuestion.answers}
        onAnswer={onUserAnswer}
      />;
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      question: -1,
    };
  }

  render() {
    const {questions} = this.props;
    const {question} = this.state;

    return App.getScreen(question, this.props, () => {
      this.setState({
        question: question + 1 >= questions.length
          ? -1
          : question + 1,
      });
    });
  }
}

App.propTypes = {
  gameTime: propTypes.number.isRequired,
  errorCount: propTypes.number.isRequired,
  questions: propTypes.arrayOf(propTypes.shape({
    type: propTypes.oneOf([`genre`, `artist`]).isRequired,
    genre: propTypes.oneOf([`rock`, `pop`, `jazz`]),
    song: propTypes.shape({
      artist: propTypes.string,
      src: propTypes.string,
    }),
    answers: propTypes.arrayOf(propTypes.shape({
      genre: propTypes.oneOf([`rock`, `pop`, `jazz`]),
      src: propTypes.string,
      picture: propTypes.string,
      artist: propTypes.string,
    })).isRequired,
  })),
  onStartButtonClick: propTypes.func,
};
