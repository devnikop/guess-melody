import { compose } from "recompose";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

import ArtistScreen from "../../components/artist-screen/artist-screen.jsx";
import GenreScreen from "../../components/genre-screen/genre-screen.jsx";
import WelcomeScreen from "../../components/welcome-screen/welcome-screen.jsx";

import withActivePlayer from "../with-active-player/with-active-player.jsx";
import withAnswers from "../with-answers/with-answers.jsx";
import withTransformProps from "../with-transform-props/with-transform-props.jsx";

const transformPlayerToAnswer = (props) => {
  const newProps = {
    ...props,
    renderAnswer: props.renderPlayer,
  }
  delete newProps.renderPlayer;
  return newProps
};

const ArtistScreenWrapped = withActivePlayer(
  withTransformProps(transformPlayerToAnswer)(ArtistScreen)
);
const GenreScreenWrapped = withActivePlayer(withAnswers(
  withTransformProps(transformPlayerToAnswer)(GenreScreen)
));

const withScreenSwitch = (Component) => {
  class WithScreenSwitch extends React.PureComponent {
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
            <ArtistScreenWrapped
              key={`artist-${questionStep}`}
              question={currentQuestion}
            />
          );
      }
      return null;
    }
  }

  WithScreenSwitch.propTypes = {
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

  return WithScreenSwitch;
};



const mapStateToProps = (state) => ({
  errorCount: state.errorCount,
  gameTime: state.gameTime,
  questions: state.questions,
  questionStep: state.currentQuestion,
});

export default compose(
  connect(mapStateToProps),
  withScreenSwitch
);
