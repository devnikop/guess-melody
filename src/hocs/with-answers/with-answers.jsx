import { compose } from "recompose";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

import { ActionCreator } from "../../reducer/game/game";
import { genreQuestionType } from "../../types/types";

const withAnswers = (Component) => {
  class WithAnswers extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        answers: Array(this.props.question.answers.length).fill(false),
      };

      this._handleFormSubmit = this._handleFormSubmit.bind(this);
      this._handleInputChange = this._handleInputChange.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        onFormSubmit={this._handleFormSubmit}
        onInputChange={this._handleInputChange}
      />
    }

    _handleFormSubmit() {
      const { onFormSubmit } = this.props;
      const { answers } = this.state;
      onFormSubmit(answers)
    }

    _handleInputChange(index) {
      const { answers } = this.state;
      this.setState({
        answers: this._getUpdatedAnswers(answers, index)
      })
    }

    _getUpdatedAnswers(answers, index) {
      return answers.map((answer, answerIndex, answers) =>
        (answerIndex === index)
          ? answers[answerIndex] = !answers[answerIndex]
          : answers[answerIndex]
      )
    }
  }

  WithAnswers.propTypes = {
    question: genreQuestionType,
    onFormSubmit: PropTypes.func.isRequired,
  };

  return WithAnswers;
};

const mapDispatch = {
  onFormSubmit: ActionCreator.checkGenreQuestion
};

export default compose(
  connect(null, mapDispatch),
  withAnswers
);
