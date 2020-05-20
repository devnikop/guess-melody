import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

import { ActionCreator } from "../../store/reducer.js";

const ArtistScreen = ({
  question,
  onChange,
  renderPlayer,
}) => {
  const { answers, song } = question;

  const _handleInputChange = (index) => {
    onChange(index);
  }

  return (
    <section className="game game--artist">
      <section className="game__screen">
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        <div className="game__track">
          {renderPlayer(song.src, 0)}
        </div>

        <form className="game__artist">
          {answers.map((answer, index) => (
            <div className="artist" key={index}>
              <input
                className="artist__input visually-hidden"
                type="radio"
                name="answer"
                value={`answer-${index}`}
                id={`answer-${index}`}
                onChange={_handleInputChange.bind(null, index)}
              />
              <label className="artist__name" htmlFor={`answer-${index}`}>
                <img
                  className="artist__picture"
                  src={answer.picture}
                  alt={answer.artist}
                />
                {answer.artist}
              </label>
            </div>
          ))}
        </form>
      </section>
    </section>
  );
}

ArtistScreen.propTypes = {
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
  onChange: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  onChange: ActionCreator.checkArtistQuestion
};

export { ArtistScreen };
export default connect(null, mapDispatchToProps)(ArtistScreen);
