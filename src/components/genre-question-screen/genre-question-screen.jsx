import React from 'react';
import PropTypes from 'prop-types';

import {GENRE_TYPES} from '../../constants';

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
  question: PropTypes.shape({
    type: PropTypes.oneOf([`genre`]).isRequired,
    genre: PropTypes.oneOf(GENRE_TYPES).isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      genre: PropTypes.oneOf(GENRE_TYPES).isRequired,
      src: PropTypes.string.isRequired,
    })).isRequired,
  }),
  onAnswer: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  renderAnswer: PropTypes.func.isRequired,
  userAnswer: PropTypes.arrayOf(PropTypes.bool).isRequired,
};
