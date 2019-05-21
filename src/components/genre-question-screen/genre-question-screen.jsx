import React from 'react';
import propTypes from 'prop-types';

import {AudioPlayer} from '../audio-player/audio-player.jsx';

export class GenreQuestionScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activePlayer: -1,
    };
  }

  render() {
    const {
      genre,
      answers,
      onAnswer,
    } = this.props;

    return <section className="game game--genre">
      <header className="game__header">
        <a className="game__back" href="#">
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
        </a>

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370"
            style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}} />
        </svg>

        <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
          <span className="timer__mins">05</span>
          <span className="timer__dots">:</span>
          <span className="timer__secs">00</span>
        </div>

        <div className="game__mistakes">
          <div className="wrong"></div>
          <div className="wrong"></div>
          <div className="wrong"></div>
        </div>
      </header>

      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form className="game__tracks" onSubmit={(evt) => {
          evt.preventDefault();
          onAnswer();
        }}>
          {answers.map((it, i) => <div className="track" key={`answer-${i}`}>
            <AudioPlayer
              isPlaying={i === this.state.activePlayer}
              onPlayButtonClick={() =>
                this.setState({
                  activePlayer: this.state.activePlayer === i ? -1 : i
                })}
              src={it.src}
            />
            <div className="game__answer">
              <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${i}`} id={`answer-${i}`} />
              <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
            </div>
          </div>)}
          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    </section>;
  }
}

GenreQuestionScreen.propTypes = {
  genre: propTypes.oneOf([`rock`, `pop`, `jazz`]).isRequired,
  answers: propTypes.arrayOf(propTypes.shape({
    genre: propTypes.oneOf([`rock`, `pop`, `jazz`]).isRequired,
    src: propTypes.string.isRequired,
  })).isRequired,
  onAnswer: propTypes.func,
};
