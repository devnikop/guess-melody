import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {GENRE_TYPES} from '../../constants';

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
    question: PropTypes.shape({
      type: PropTypes.oneOf([`genre`]).isRequired,
      genre: PropTypes.oneOf(GENRE_TYPES).isRequired,
      answers: PropTypes.arrayOf(PropTypes.shape({
        genre: PropTypes.oneOf(GENRE_TYPES).isRequired,
        src: PropTypes.string.isRequired,
      })).isRequired,
    }),
    onAnswer: PropTypes.func.isRequired,
  };

  return WithUserAnswer;
};

export default withUserAnswer;
