import PropTypes from "prop-types";
import React from "react";

const ArtistScreen = ({ onAnswer, question }) => {
  const { answers } = question;
  return (
    <section className="game game--artist">
      <section className="game__screen">
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        <div className="game__track">
          <button
            className="track__button track__button--play"
            type="button"
          ></button>
          <audio></audio>
        </div>

        <form className="game__artist" onChange={onAnswer}>
          {answers.map((it, i) => (
            <div className="artist" key={i}>
              <input
                className="artist__input visually-hidden"
                type="radio"
                name="answer"
                value={`answer-${i}`}
                id={`answer-${i}`}
              />
              <label className="artist__name" htmlFor={`answer-${i}`}>
                <img
                  className="artist__picture"
                  src={it.picture}
                  alt={it.artist}
                />
                {it.artist}
              </label>
            </div>
          ))}
        </form>
      </section>
    </section>
  );
};

ArtistScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(
      PropTypes.shape({
        picture: PropTypes.string.isRequired,
        artist: PropTypes.string.isRequired,
      })
    ),
    song: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    }),
    type: PropTypes.oneOf([`artist`]).isRequired,
  }).isRequired,
};

export default ArtistScreen;
