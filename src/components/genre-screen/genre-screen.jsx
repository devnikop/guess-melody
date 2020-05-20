import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

import AudioPlayer from "../audio-player/audio-player.jsx";

import { ActionCreator } from "../../store/reducer.js";

class GenreScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      answers: Array(props.question.answers.length).fill(false),
    };
  }

  render() {
    const { question, activePlayer } = this.props;
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
                isPlaying={i === activePlayer}
                onPlayButtonClick={this._handlePlayClick.bind(this, i)}
                src={it.src}
              />
              <div className="game__answer">
                <input
                  className="game__input visually-hidden"
                  defaultValue={`answer-${i}`}
                  id={`answer-${i}`}
                  name="answer"
                  type="checkbox"
                  onChange={this._handleInputChange.bind(this, i)}
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

  _handlePlayClick(index) {
    const { onPlayButtonClick } = this.props;

    onPlayButtonClick(index);
  }

  _handleFormSubmit(evt) {
    const { onSubmit } = this.props;
    const { answers } = this.state;

    evt.preventDefault();
    onSubmit(answers);
  }

  _handleInputChange(index) {
    this.setState({
      answers: this._getUpdatedAnswers(this.state.answers, index)
    })
  }

  _getUpdatedAnswers(answers, index) {
    return answers.map((answer, answerIndex, answers) =>
      answerIndex === index
        ? answers[answerIndex] = !answers[answerIndex]
        : answers[answerIndex]
    )
  }
}

GenreScreen.propTypes = {
  activePlayer: PropTypes.number.isRequired,
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
  onPlayButtonClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const mapDispatch = {
  onSubmit: ActionCreator.checkGenreQuestion
};

export { GenreScreen };
export default connect(null, mapDispatch)(GenreScreen);
