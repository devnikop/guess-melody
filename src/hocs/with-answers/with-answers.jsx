import React from "react";

import { genreQuestionType } from "../../types/types";

const withAnswers = (Component) => {
  class WithAnswers extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        answers: Array(this.props.question.answers.length).fill(false),
      };

      this._handleInputChange = this._handleInputChange.bind(this);
    }

    render() {
      const { answers } = this.state;

      return <Component
        {...this.props}
        answers={answers}
        onInputChange={this._handleInputChange}
      />
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
  };

  return WithAnswers;
};

export default withAnswers;
