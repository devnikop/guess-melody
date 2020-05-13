import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

import AudioPlayer from "../audio-player/audio-player.jsx";

import { ActionCreator } from "../../store/reducer.js";

class GenreScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activePlayer: -1,
    };

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  render() {
    const { question } = this.props;
    const { answers, genre } = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={this._handleFormSubmit}
        >
          {answers.map((it, i) => (
            <div className="track" key={`answer-${i}`}>
              <AudioPlayer
                isPlaying={i === this.state.activePlayer}
                onPlayButtonClick={() =>
                  this.setState({
                    activePlayer: this.state.activePlayer === i ? -1 : i,
                  })
                }
                src={it.src}
              />
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
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    this.props.onAnswer();
  }
}

GenreScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
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

const mapDispatchToProps = {
  onAnswer: ActionCreator.incrementStep
};

export { GenreScreen };

export default connect(null, mapDispatchToProps)(GenreScreen);
