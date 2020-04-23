import PropTypes from "prop-types";
import React from "react";

const GenreScreen = ({ onAnswer, question }) => {
  const { answers, genre } = question;

  return (
    <section className="game__screen">
      <h2 className="game__title">Выберите {genre} треки</h2>
      <form
        className="game__tracks"
        onSubmit={(evt) => {
          evt.preventDefault();
          onAnswer();
        }}
      >
        {answers.map((it, i) => (
          <div className="track" key={`answer-${i}`}>
            <button
              className="track__button track__button--play"
              type="button"
            />
            <div className="track__status">
              <audio />
            </div>
            <div className="game__answer">
              <input
                className="game__input visually-hidden"
                type="checkbox"
                name="answer"
                defaultValue={`answer-${i}`}
                id={`answer-${i}`}
              />
              <label className="game__check" htmlFor={`answer-${i}`}>
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
};

GenreScreen.propTypes = {
  onAnswer: PropTypes.func,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(
      PropTypes.shape({
        genre: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
      })
    ).isRequired,
    genre: PropTypes.oneOf([`rock`, `pop`, `jazz`]).isRequired,
    type: PropTypes.oneOf([`genre`]).isRequired,
  }),
};

export default GenreScreen;
