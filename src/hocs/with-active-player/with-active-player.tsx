import * as React from 'react';
import {Subtract} from 'utility-types';

import {AudioPlayer} from '../../components/audio-player/audio-player';
import withAudio from "../with-audio/with-audio";

interface State {
  activePlayer: number,
}

interface InjectedProps {
  renderPlayer,
}

const AudioPlayerWrapped = withAudio(AudioPlayer);

const withActivePlayer = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectedProps>;

  class WithActivePlayer extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        activePlayer: -1,
      };
    }

    render() {
      const {activePlayer} = this.state;

      return <Component
        {...this.props}
        renderPlayer={(it, i) => {
          return <AudioPlayerWrapped
            isPlaying={i === activePlayer}
            onPlayButtonClick={() =>
              this.setState({
                activePlayer: this.state.activePlayer === i ? -1 : i
              })}
            src={it.src}
          />;
        }}
      />;
    }
  }
  return WithActivePlayer;
};

export default withActivePlayer;
