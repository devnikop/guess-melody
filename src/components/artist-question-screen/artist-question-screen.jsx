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
      question,
      onAnswer
    } = this.props;
    const {
      song,
      answers,
    } = question;

    return <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>
      <AudioPlayer
        isPlaying={isPlaying}
        onPlayButtonClick={() => this.setState({
          isPlaying: !isPlaying
        })}
        src={song.src}
      />

      <form className="game__artist">
        {answers.map((it, i) =>
          <div className="artist" key={i}>
            <input
              className="artist__input visually-hidden"
              type="radio" name="answer"
              value={`artist-${i}`}
              id={`artist-${i}`}
              onChange={() => onAnswer(it)}
            />
            <label className="artist__name" htmlFor={`artist-${i}`}>
              <img className="artist__picture" src={it.picture} alt={it.artist} />
              Пелагея
            </label>
          </div>
        )}
      </form>
    </section>;
  }
}

ArtistQuestionScreen.propTypes = {
  question: propTypes.shape({
    answers: propTypes.arrayOf(propTypes.shape({
      artist: propTypes.string.isRequired,
      picture: propTypes.string.isRequired,
    })).isRequired,
    song: propTypes.shape({
      artist: propTypes.string.isRequired,
      src: propTypes.string.isRequired,
    }).isRequired,
    type: propTypes.oneOf([`artist`]).isRequired,
  }).isRequired,
  onAnswer: propTypes.func,
};
