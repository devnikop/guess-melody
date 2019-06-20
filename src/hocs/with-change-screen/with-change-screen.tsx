import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import * as React from 'react';

import {ActionCreator} from '../../reducer/game/game';
import {getQuestions} from '../../reducer/data/selectors';
import {getMistakes, getStep} from '../../reducer/game/selectors';
import {getAuthorizationStatus} from '../../reducer/user/selectors';

import withActivePlayer from '../with-active-player/with-active-player';
import withAuthorizationScreen from '../with-authorization-screen/with-authorization-screen';
import withTransformProps from '../with-transform-props/with-transform-props';
import withUserAnswer from '../with-user-answer/with-user-answer';

import {ArtistQuestionScreen} from '../../components/artist-question-screen/artist-question-screen';
import AuthorizationScreen from '../../components/authorization-screen/authorization-screen';
import {GenreQuestionScreen} from '../../components/genre-question-screen/genre-question-screen';
import {WelcomeScreen} from '../../components/welcome-screen/welcome-screen';
import LosingScene from '../../components/losing-scene/losing-scene';
import VictoryScene from '../../components/victory-scene/victory-scene';

import {
  QuestionArtist,
  QuestionGenre,
} from '../../types';

interface Props {
  gameTime: number,
  isAuthorizationRequired: boolean,
  maxMistakes: number,
  mistakes: number,
  onReplayClick: () => void,
  onUserAnswer: (userAnswer: boolean[], question: Question) => void,
  onWelcomeScreenClick: () => void,
  questions: Question[],
  step: number,
}

type Question = QuestionArtist | QuestionGenre;

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

const AuthorizationScreenWrapped = withAuthorizationScreen(AuthorizationScreen);

const withChangeScreen = (Component) => {
  class WithChangeScreen extends React.PureComponent<Props> {
    constructor(props) {
      super(props);

      this._getScreen = this._getScreen.bind(this);
    }

    render() {
      const {
        mistakes,
        onReplayClick,
      } = this.props;

      return <BrowserRouter>
        <Switch>
          <Route path="/" exact
            render={() => <Component
              {...this.props}
              renderScreen={this._getScreen}
            />}
          />
          <Route path="/win" render={() => <VictoryScene
            mistakes={mistakes}
            onClick={onReplayClick}
          />} />
          <Route path="/lose" render={() => <LosingScene
            onClick={onReplayClick}
          />} />
          <Route path="/login" component={AuthorizationScreenWrapped} />
        </Switch>
      </BrowserRouter>;
    }

    _getScreen() {
      const {
        isAuthorizationRequired,
        maxMistakes,
        mistakes,
        onUserAnswer,
        questions,
        step,
      } = this.props;

      const question = questions[step];

      if (step >= questions.length && isAuthorizationRequired) {
        return <Redirect to="/login" />;
      } else if (step >= questions.length) {
        return <Redirect to="/win" />;
      }

      if (mistakes >= maxMistakes) {
        return <Redirect to="/lose" />;
      }

      if (step === -1) {
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

  return WithChangeScreen;
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    isAuthorizationRequired: getAuthorizationStatus(state),
    mistakes: getMistakes(state),
    questions: getQuestions(state),
    step: getStep(state),
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
