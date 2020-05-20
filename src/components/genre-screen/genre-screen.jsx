import PropTypes from "prop-types";
import React from "react";

import { genreQuestionType } from "../../types/types.js";

const GenreScreen = ({
  question,
  onFormSubmit,
  onInputChange,
  renderPlayer,
}) => {
  const { answers, genre } = question;

  const _handleFormSubmit = (evt) => {
    evt.preventDefault();
    onFormSubmit();
  }

  const _handleInputChange = (index) => {
    onInputChange(index);
  };

  return (
    <section className="game__screen">
      <h2 className="game__title">Выберите {genre} треки</h2>
      <form
        className="game__tracks"
        onSubmit={_handleFormSubmit}
      >
        {answers.map((answer, index) => (
          <div className="track" key={`answer-${index}`}>
            {renderPlayer(answer, index)}
            <div className="game__answer">
              <input
                className="game__input visually-hidden"
                defaultValue={`answer-${index}`}
                id={`answer-${index}`}
                name="answer"
                type="checkbox"
                onChange={_handleInputChange.bind(null, index)}
              />
              <label className="game__check" htmlFor={`answer-${index}`}>
                Отметить
              </label>
            </div>
          </div>
        ))}
        <button className="game__submit button" type="submit">
          Ответить
        </button>
      </form>
    </section>
  );
}

GenreScreen.propTypes = {
  question: genreQuestionType,
  onFormSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
};

export default GenreScreen;
