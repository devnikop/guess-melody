import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

import { ActionCreator } from "../../reducer/game/game";
import { artistQuestionType } from "../../types/types";

const ArtistScreen = ({
  question,
  onChange,
  renderAnswer,
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
          {renderAnswer(song.src, 0)}
        </div>

        <form className="game__artist">
          {answers.map((answer, index) => (
            <div className="artist" key={index}>
              <input
                className="artist__input visually-hidden"
                id={`answer-${index}`}
                name="answer"
                type="radio"
                value={`answer-${index}`}
                onChange={_handleInputChange.bind(null, index)}
              />
              <label className="artist__name" htmlFor={`answer-${index}`}>
                <img
                  className="artist__picture"
                  alt={answer.artist}
                  src={answer.picture}
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
  question: artistQuestionType,
  onChange: PropTypes.func.isRequired,
  renderAnswer: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  onChange: ActionCreator.checkArtistQuestion
};

export { ArtistScreen };
export default connect(null, mapDispatchToProps)(ArtistScreen);
