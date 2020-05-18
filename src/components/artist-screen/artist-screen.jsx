import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

import AudioPlayer from "../audio-player/audio-player.jsx";

import { ActionCreator } from "../../store/reducer.js";

class ArtistScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
    };

    this._handleInputChange = this._handleInputChange.bind(this);
  }

  render() {
    const { onChange, question } = this.props;
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

          <form className="game__artist">
            {answers.map((it, i) => (
              <div className="artist" key={i}>
                <input
                  className="artist__input visually-hidden"
                  type="radio"
                  name="answer"
                  value={`answer-${i}`}
                  id={`answer-${i}`}
                  onChange={this._handleInputChange.bind(null, i)}
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

  _handleInputChange(index) {
    this.props.onChange(index);
  }
}

ArtistScreen.propTypes = {
  onChange: PropTypes.func.isRequired,
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

const mapDispatchToProps = {
  onChange: ActionCreator.checkArtistQuestion
};

export { ArtistScreen };
export default connect(null, mapDispatchToProps)(ArtistScreen);
