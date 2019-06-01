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
    }

    render() {
      return <Component
        {...this.props}
        userAnswer={this.state.userAnswer}
        onChange={(i) => {
          const userAnswer = [...this.state.userAnswer];
          userAnswer[i] = !userAnswer[i];

          this.setState({
            userAnswer,
          });
        }}
      />;
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
  };

  return WithUserAnswer;
};

export default withUserAnswer;
