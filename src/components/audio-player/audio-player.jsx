import React from 'react';
import propTypes from 'prop-types';

export class AudioPlayer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      idLoading: true,
      isPlaying: props.isPlaying,
    };

    this._onPlayButtonClick = this._onPlayButtonClick.bind(this);
  }

  render() {
    const {isLoading, isPlaying} = this.state;

    return <div className="game__track">
      <button
        className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
        type="button"
        disabled={isLoading}
        onClick={this._onPlayButtonClick}
      />
      <div className="track__status">
        <audio/>
      </div>
    </div>;
  }

  componentDidMount() {
    this._audio = new Audio(this.props.src);

    this._audio.oncanplaythrough = () =>
      this.setState({
        isLoading: false,
      });

    this._audio.onplay = () => {
      this.setState({
        isPlaying: true,
      });
    };

    this._audio.onpause = () =>
      this.setState({
        isPlaying: false,
      });

    this._audio.ontimeupdate = () =>
      this.setState({
        progress: this._audio.currentTime
      });
  }

  componentDidUpdate() {
    if (this.props.isPlaying) {
      this._audio.play();
    } else {
      this._audio.pause();
    }
  }

  componentWillUnmount() {
    this._audio.oncanplaythrough = null;
    this._audio.onplay = null;
    this._audio.onpause = null;
    this._audio.ontimeupdate = null;
    this._audio.src = ``;
    this._audio = null;
  }

  _onPlayButtonClick() {
    this.props.onPlayButtonClick();
    this.setState({isPlaying: !this.state.isPlaying});
  }
}

AudioPlayer.propTypes = {
  isPlaying: propTypes.bool.isRequired,
  onPlayButtonClick: propTypes.func.isRequired,
  src: propTypes.string.isRequired,
};
