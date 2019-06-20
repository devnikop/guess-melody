import * as React from 'react';

import {
  QuestionGenre,
  RenderAnswer,
} from '../../types';

interface Props {
  onAnswer: () => void,
  onChange: (id: number) => void,
  question: QuestionGenre,
  renderAnswer: RenderAnswer,
  userAnswer: boolean[],
}

export class GenreQuestionScreen extends React.PureComponent<Props> {
  constructor(props) {
    super(props);

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  render() {
    const {
      onChange,
      question,
      renderAnswer,
      userAnswer,
    } = this.props;

    return <section className="game__screen">
      <h2 className="game__title">Выберите {question.genre} треки</h2>
      <form className="game__tracks" onSubmit={this._handleFormSubmit}>
        {question.answers.map((it, i) => <div className="track" key={`answer-${i}`}>
          {renderAnswer(it, i)}
          <div className="game__answer">
            <input
              checked={userAnswer[i]}
              className="game__input visually-hidden"
              type="checkbox" name="answer"
              value={`answer-${i}`}
              id={`answer-${i}`}
              onChange={() => onChange(i)}
            />
            <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
          </div>
        </div>)}
        <button className="game__submit button" type="submit">Ответить</button>
      </form>
    </section>;
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    this.props.onAnswer();
  }
}
