import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import {ActionCreator} from '../../reducer';
import {ArtistQuestionScreen} from '../artist-question-screen/artist-question-screen.jsx';
import {GenreQuestionScreen} from '../genre-question-screen/genre-question-screen.jsx';
import {WelcomeScreen} from '../welcome-screen/welcome-screen.jsx';

const Type = {
  ARTIST: `game--artist`,
  GENRE: `game--genre`,
};

class App extends React.PureComponent {
  _getScreen(question) {
    if (!question) {
      const {
        gameTime,
        maxMistakes,
        onWelcomeScreenClick,
      } = this.props;

      return <WelcomeScreen
        time={gameTime}
        errorCount={maxMistakes}
        onClick={onWelcomeScreenClick}
      />;
    }

    const {
      onUserAnswer,
      mistakes,
      maxMistakes
    } = this.props;

    switch (question.type) {
      case `genre`: return <GenreQuestionScreen
        question={question}
        onAnswer={(userAnswer) => onUserAnswer(
            userAnswer,
            question,
            mistakes,
            maxMistakes
        )}
        key={`genre-question-screen${this.props.step}`}
      />;

      case `artist`: return <ArtistQuestionScreen
        question={question}
        onAnswer={(userAnswer) => onUserAnswer(
            userAnswer,
            question,
            mistakes,
            maxMistakes
        )}
        key={`artist-question-screen${this.props.step}`}
      />;
    }

    return null;
  }

  render() {
    const {
      questions,
      step,
    } = this.props;

    return <section className={`game game--${Type.ARTIST}`}>
      <header className="game__header">
        <a className="game__back" href="#">
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
        </a>

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370"
            style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}} />
        </svg>

        <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
          <span className="timer__mins">05</span>
          <span className="timer__dots">:</span>
          <span className="timer__secs">00</span>
        </div>

        <div className="game__mistakes">
          <div className="wrong"></div>
          <div className="wrong"></div>
          <div className="wrong"></div>
        </div>
      </header>
      {this._getScreen(questions[step])}
    </section>;

  }
}

App.propTypes = {
  maxMistakes: propTypes.number.isRequired,
  mistakes: propTypes.number.isRequired,
  gameTime: propTypes.number.isRequired,
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
  step: propTypes.number.isRequired,
  onUserAnswer: propTypes.func.isRequired,
  onWelcomeScreenClick: propTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    step: state.step,
    mistakes: state.mistakes,
  });

const mapDispatchToProps = (dispatch) => ({
  onWelcomeScreenClick: () => {
    dispatch(ActionCreator.incrementStep());
  },

  onUserAnswer: (question, userAnswer, mistakes, maxMistakes) => {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(
        userAnswer,
        question,
        mistakes,
        maxMistakes
    ));
  },
});

export {App};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
