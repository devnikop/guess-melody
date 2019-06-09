import {compose} from 'recompose';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {ActionCreator} from '../../reducer';
import {GENRE_TYPES} from '../../constants';
import withActivePlayer from '../with-active-player/with-active-player';
import withTransformProps from '../with-transform-props/with-transform-props';
import withUserAnswer from '../with-user-answer/with-user-answer';

import {ArtistQuestionScreen} from '../../components/artist-question-screen/artist-question-screen.jsx';
import AuthorizationScreen from '../../components/authorization-screen/authorization-screen.jsx';
import {GenreQuestionScreen} from '../../components/genre-question-screen/genre-question-screen.jsx';
import {WelcomeScreen} from '../../components/welcome-screen/welcome-screen.jsx';
import LosingScene from '../../components/losing-scene/losing-scene.jsx';
import VictoryScene from '../../components/victory-scene/victory-scene.jsx';

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

const withChangeScreen = (Component) => {
  class WithChangeScreen extends React.PureComponent {
    constructor(props) {
      super(props);

      this._getScreen = this._getScreen.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        renderScreen={this._getScreen}
      />;
    }

    _getScreen() {
      const {
        maxMistakes,
        mistakes,
        onReplayClick,
        onUserAnswer,
        questions,
        step,
      } = this.props;

      const question = questions[step];

      if (this.props.isAuthorizationRequired) {
        return <AuthorizationScreen />;
      }

      if (step >= questions.length) {
        return <VictoryScene
          mistakes={mistakes}
          onClick={() => onReplayClick()}
        />;
      } else if (!question) {
        const {
          gameTime,
          onWelcomeScreenClick,
        } = this.props;

        return <WelcomeScreen
          time={gameTime}
          errorCount={maxMistakes}
          onClick={onWelcomeScreenClick}
        />;
      }

      if (mistakes >= maxMistakes) {
        return <LosingScene
          onClick={() => onReplayClick()}
        />;
      }

      switch (question.type) {
        case `genre`: return <GenreQuestionScreenWrapped
          question={question}
          onAnswer={(userAnswer) => onUserAnswer(
              userAnswer,
              question
          )}
          key={`genre-question-screen${this.props.step}`}
        />;

        case `artist`: return <ArtistQuestionScreenWrapped
          question={question}
          onAnswer={(userAnswer) => onUserAnswer(
              userAnswer,
              question
          )}
          key={`artist-question-screen${this.props.step}`}
        />;
      }
      return null;
    }
  }

  WithChangeScreen.propTypes = {
    gameTime: PropTypes.number.isRequired,
    isAuthorizationRequired: PropTypes.bool.isRequired,
    maxMistakes: PropTypes.number.isRequired,
    mistakes: PropTypes.number.isRequired,
    onReplayClick: PropTypes.func.isRequired,
    onUserAnswer: PropTypes.func.isRequired,
    onWelcomeScreenClick: PropTypes.func.isRequired,
    questions: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.oneOf([`genre`, `artist`]).isRequired,
      genre: PropTypes.oneOf(GENRE_TYPES),
      song: PropTypes.shape({
        artist: PropTypes.string,
        src: PropTypes.string,
      }),
      answers: PropTypes.arrayOf(PropTypes.shape({
        genre: PropTypes.oneOf(GENRE_TYPES),
        src: PropTypes.string,
        picture: PropTypes.string,
        artist: PropTypes.string,
      })).isRequired,
    })),
    step: PropTypes.number.isRequired,
  };

  return WithChangeScreen;
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    isAuthorizationRequired: state.isAuthorizationRequired,
    mistakes: state.mistakes,
    questions: state.questions,
    step: state.step,
  });

const mapDispatchToProps = (dispatch) => ({
  onWelcomeScreenClick: () => {
    dispatch(ActionCreator.incrementStep());
  },

  onReplayClick: () => {
    dispatch(ActionCreator.restart());
  },

  onUserAnswer: (userAnswer, question) => {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(
        userAnswer,
        question
    ));
  },
});

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withChangeScreen
);
