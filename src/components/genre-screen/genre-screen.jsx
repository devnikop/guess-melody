import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

import AudioPlayer from "../audio-player/audio-player.jsx";

import { genreQuestionType } from "../../types/types.js";

import { ActionCreator } from "../../store/reducer.js";

const GenreScreen = ({
  activePlayer,
  answers,
  question,
  onFormSubmit,
  onInputChange,
  onPlayButtonClick,
}) => {
  const { answers: questionAnswers, genre } = question;

  const _handleFormSubmit = (evt) => {
    evt.preventDefault();
    onFormSubmit(answers);
  }

  return (
    <section className="game__screen">
      <h2 className="game__title">Выберите {genre} треки</h2>
      <form
        className="game__tracks"
        onSubmit={_handleFormSubmit}
      >
        {questionAnswers.map((it, i) => (
          <div className="track" key={`answer-${i}`}>
            <AudioPlayer
              isPlaying={i === activePlayer}
              onPlayButtonClick={onPlayButtonClick.bind(null, i)}
              src={it.src}
            />
            <div className="game__answer">
              <input
                className="game__input visually-hidden"
                defaultValue={`answer-${i}`}
                id={`answer-${i}`}
                name="answer"
                type="checkbox"
                onChange={onInputChange.bind(null, i)}
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
}

GenreScreen.propTypes = {
  activePlayer: PropTypes.number.isRequired,
  answers: PropTypes.arrayOf(PropTypes.bool.isRequired).isRequired,
  question: genreQuestionType,
  onFormSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
};

const mapDispatch = {
  onFormSubmit: ActionCreator.checkGenreQuestion
};

export { GenreScreen };
export default connect(null, mapDispatch)(GenreScreen);
