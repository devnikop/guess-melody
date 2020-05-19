import PropTypes from "prop-types";
import React from "react";

class AudioPlayer extends React.PureComponent {
  constructor(props) {
    super(props);

    this._audioRef = React.createRef();
    this._audio = null;

    this.state = {
      isLoaded: false,
      progress: 0,
    };
  }

  render() {
    const { isPlaying, onPlayButtonClick } = this.props;
    const { isLoaded } = this.state;

    return (
      <>
        <button
          className={`track__button track__button--${
            isPlaying ? `pause` : `play`
          }`}
          type="button"
          disabled={!isLoaded}
          onClick={onPlayButtonClick}
        />
        <div className="track__status">
          <audio ref={this._audioRef} />
        </div>
      </>
    );
  }

  componentDidMount() {
    const { src } = this.props;
    this._audio = this._audioRef.current;
    this._audio.src = src;

    this._audio.oncanplaythrough = () =>
      this.setState({
        isLoaded: true,
      });

    this._audio.onpause = () =>
      this.setState({
        isPlaying: false,
      });

    this._audio.onplay = () =>
      this.setState({
        isPlaying: true,
      });

    this._audio.ontimeupdate = () =>
      this.setState({
        progress: Math.floor(this._audio.currentTime),
      });
  }

  componentDidUpdate() {
    this.props.isPlaying ? this._audio.play() : this._audio.pause();
  }

  componentWillUnmount() {
    this._audio.oncanplaythrough = null;
    this._audio.onpause = null;
    this._audio.onplay = null;
    this._audio.ontimeupdate = null;
    this._audio.src = null;
  }
}

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
};

export default AudioPlayer;
