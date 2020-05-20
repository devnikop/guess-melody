import PropTypes from "prop-types";
import React from "react";

const withAudio = (Component) => {
  class WithAudio extends React.PureComponent {
    constructor(props) {
      super(props);

      this._audioRef = React.createRef();
      this._audio = null;

      this.state = {
        isLoaded: false,
        isPlaying: props.isPlaying,
        progress: 0,
      };

      this._onPlayButtonClick = this._onPlayButtonClick.bind(this);
      this._renderAudio = this._renderAudio.bind(this);
    }

    render() {
      const { isLoaded, isPlaying } = this.state;

      return (
        <Component
          {...this.props}
          isLoaded={isLoaded}
          isPlaying={isPlaying}
          onPlayButtonClick={this._onPlayButtonClick}
          renderAudio={this._renderAudio}
        />
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

    _onPlayButtonClick() {
      const { onPlayButtonClick } = this.props;
      const { isPlaying } = this.state;

      onPlayButtonClick();
      this.setState({ isPlaying: !isPlaying })
    }

    _renderAudio() {
      return <audio ref={this._audioRef} />;
    }
  }

  WithAudio.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    onPlayButtonClick: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
  };

  return WithAudio;
};

export default withAudio;
