import React, {PureComponent} from 'react';
import propTypes from 'prop-types';

const withUserAnswer = (Component) => {
  class WithUserAnswer extends PureComponent {
    constructor(props) {
      super(props);

      const {answers} = this.props.question;

      this.state = {
        userAnswer: new Array(answers.length).fill(false),
      };

      this._onChange = this._onChange.bind(this);
      this._onAnswer = this._onAnswer.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        userAnswer={this.state.userAnswer}
        onChange={this._onChange}
        onAnswer={this._onAnswer}
      />;
    }

    _onChange(i) {
      const userAnswer = [...this.state.userAnswer];
      userAnswer[i] = !userAnswer[i];
      this.setState({userAnswer});
    }

    _onAnswer() {
      this.props.onAnswer(this.state.userAnswer);
    }
  }

  WithUserAnswer.propTypes = {
    question: propTypes.shape({
      type: propTypes.oneOf([`genre`]).isRequired,
      genre: propTypes.oneOf([`rock`, `pop`, `jazz`]).isRequired,
      answers: propTypes.arrayOf(propTypes.shape({
        genre: propTypes.oneOf([`rock`, `pop`, `jazz`]).isRequired,
        src: propTypes.string.isRequired,
      })).isRequired,
    }),
    onAnswer: propTypes.func.isRequired,
  };

  return WithUserAnswer;
};

export default withUserAnswer;
