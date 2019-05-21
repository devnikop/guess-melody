import React from 'react';
import propTypes from 'prop-types';

import {AudioPlayer} from '../audio-player/audio-player.jsx';

export class ArtistQuestionScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
    };
  }

  render() {
    const {isPlaying} = this.state;
    const {
      song,
      answers,
      onAnswer,
    } = this.props;

    return <section className="game game--artist">
      <header className="game__header">
        <a className="game__back" href="#">
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
        </a>

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370" style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}} />
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
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        <AudioPlayer
          isPlaying={isPlaying}
          onPlayButtonClick={() => this.setState({
            isPlaying: !isPlaying
          })}
          src={song.src}
        />

        <form className="game__artist" onChange={onAnswer}>
          {answers.map((it, i) =>
            <div className="artist" key={i}>
              <input className="artist__input visually-hidden" type="radio" name="answer" value={`artist-${i}`} id={`artist-${i}`} />
              <label className="artist__name" htmlFor={`artist-${i}`}>
                <img className="artist__picture" src={it.picture} alt={it.artist} />
                Пелагея
              </label>
            </div>
          )}
        </form>
      </section>
    </section>;
  }
}

ArtistQuestionScreen.propTypes = {
  song: propTypes.shape({
    artist: propTypes.string.isRequired,
    src: propTypes.string.isRequired,
  }),
  answers: propTypes.arrayOf(propTypes.shape({
    picture: propTypes.string.isRequired,
    artist: propTypes.string.isRequired,
  })),
  onAnswer: propTypes.func,
};
