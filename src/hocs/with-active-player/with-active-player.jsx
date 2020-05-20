import React from "react";

import withAudio from "../with-audio/with-audio.jsx";
import AudioPlayer from "../../components/audio-player/audio-player.jsx";

const AudioPlayerWrapped = withAudio(AudioPlayer);

const withActivePlayer = (Component) => {
  class WithActivePlayer extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayer: -1,
      };

      this._handlePlayClick = this._handlePlayClick.bind(this);
    }

    render() {
      const { activePlayer } = this.state;

      return <Component
        {...this.props}
        renderPlayer={(src, index) => {
          return <AudioPlayerWrapped
            src={src}
            isPlaying={index === activePlayer}
            onPlayButtonClick={this._handlePlayClick.bind(null, index)}
          />
        }}
      />
    }

    _handlePlayClick(index) {
      const { activePlayer } = this.state;

      this.setState({
        activePlayer: (activePlayer === index) ? -1 : index,
      })
    }
  }

  return WithActivePlayer;
}

export default withActivePlayer;
