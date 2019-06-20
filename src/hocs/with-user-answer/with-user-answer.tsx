import * as React from 'react';

import {QuestionGenre} from '../../types';
import {Subtract} from 'utility-types';

interface Props {
  question: QuestionGenre,
  onAnswer: (answers: boolean[]) => void,
}

interface State {
  userAnswer: boolean[],
}

interface InjectedProps {
  userAnswer: boolean[],
  onChange: (i: number) => void,
  onAnswer: (answers: boolean[]) => void,
}

const withUserAnswer = (Component) => {
  type P = Props & React.ComponentProps<typeof Component>;

  class WithUserAnswer extends React.PureComponent<Subtract<P, InjectedProps>, State> {
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

  return WithUserAnswer;
};

export default withUserAnswer;
