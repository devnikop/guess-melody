import React from 'react';
import propTypes from 'prop-types';

export class GenreQuestionScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  render() {
    const {
      question,
      userAnswer,
      onChange,
      renderAnswer,
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

GenreQuestionScreen.propTypes = {
  question: propTypes.shape({
    type: propTypes.oneOf([`genre`]).isRequired,
    genre: propTypes.oneOf([`rock`, `pop`, `jazz`]).isRequired,
    answers: propTypes.arrayOf(propTypes.shape({
      genre: propTypes.oneOf([`rock`, `pop`, `jazz`]).isRequired,
      src: propTypes.string.isRequired,
    })).isRequired,
  }),
  onAnswer: propTypes.func.isRequired,
  onChange: propTypes.func.isRequired,
  renderAnswer: propTypes.func.isRequired,
  userAnswer: propTypes.arrayOf(propTypes.bool).isRequired,
};
