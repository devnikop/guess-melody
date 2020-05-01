import PropTypes from "prop-types";
import React from "react";

import AudioPlayer from "../audio-player/audio-player.jsx";

class ArtistScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
    };
  }

  render() {
    const { onAnswer, question } = this.props;
    const { isPlaying } = this.state;
    const { answers, song } = question;

    return (
      <section className="game game--artist">
        <section className="game__screen">
          <h2 className="game__title">Кто исполняет эту песню?</h2>
          <div className="game__track">
            <AudioPlayer
              isPlaying={isPlaying}
              onPlayButtonClick={() => this.setState({ isPlaying: !isPlaying })}
              src={song.src}
            />
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
  }
}

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
