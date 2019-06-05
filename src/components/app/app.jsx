import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {ActionCreator} from '../../reducer';
import {ArtistQuestionScreen} from '../artist-question-screen/artist-question-screen.jsx';
import {GenreQuestionScreen} from '../genre-question-screen/genre-question-screen.jsx';
import MistakeScreen from '../mistakeScreen/mistakeScreen.jsx';
import {WelcomeScreen} from '../welcome-screen/welcome-screen.jsx';

import withActivePlayer from '../../hocs/with-active-player/with-active-player';
import withTransformProps from '../../hocs/with-transform-props/with-transform-props';
import withUserAnswer from '../../hocs/with-user-answer/with-user-answer';

const transformPlayerToAnswer = (props) => {
  const newProps = Object.assign({}, props, {
    renderAnswer: props.renderPlayer,
  });
  delete newProps.renderPlayer;
  return newProps;
};

const ArtistQuestionScreenWrapped = withActivePlayer(
    withTransformProps(transformPlayerToAnswer)(ArtistQuestionScreen)
);
const GenreQuestionScreenWrapped = withUserAnswer(
    withActivePlayer(
        withTransformProps(transformPlayerToAnswer)(GenreQuestionScreen))
);

const Type = {
  ARTIST: `game--artist`,
  GENRE: `game--genre`,
};

class App extends React.PureComponent {
  _getScreen(questions, step) {
    const question = questions[step];
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
      case `genre`: return <GenreQuestionScreenWrapped
        question={question}
        onAnswer={(userAnswer) => onUserAnswer(
            userAnswer,
            questions,
            step,
            mistakes,
            maxMistakes
        )}
        key={`genre-question-screen${this.props.step}`}
      />;

      case `artist`: return <ArtistQuestionScreenWrapped
        question={question}
        onAnswer={(userAnswer) => onUserAnswer(
            userAnswer,
            questions,
            step,
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
      mistakes,
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
        {<MistakeScreen
          mistakes={mistakes}
        />}
      </header>
      {this._getScreen(questions, step)}
    </section>;

  }
}

App.propTypes = {
  maxMistakes: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  gameTime: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf([`genre`, `artist`]).isRequired,
    genre: PropTypes.oneOf([`rock`, `pop`, `jazz`]),
    song: PropTypes.shape({
      artist: PropTypes.string,
      src: PropTypes.string,
    }),
    answers: PropTypes.arrayOf(PropTypes.shape({
      genre: PropTypes.oneOf([`rock`, `pop`, `jazz`]),
      src: PropTypes.string,
      picture: PropTypes.string,
      artist: PropTypes.string,
    })).isRequired,
  })),
  step: PropTypes.number.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onWelcomeScreenClick: PropTypes.func.isRequired,
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

  onUserAnswer: (userAnswer, questions, step, mistakes, maxMistakes) => {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(
        userAnswer,
        questions[step],
        mistakes,
        maxMistakes
    ));
    dispatch(ActionCreator.shouldReset(
        questions,
        step
    ));
  },
});

export {App};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
