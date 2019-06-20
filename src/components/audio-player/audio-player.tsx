import * as React from 'react';

interface Props {
  isLoading: boolean,
  isPlaying: boolean,
  onPlayButtonClick: () => void,
  renderAudio: () => React.ReactElement,
}

export class AudioPlayer extends React.PureComponent<Props> {
  render() {
    const {
      isLoading,
      isPlaying,
      renderAudio,
      onPlayButtonClick,
    } = this.props;

    return <div className="game__track">
      <button
        className={`
          track__button
          track__button--${isPlaying ? `pause` : `play`}
        `}
        type="button"
        disabled={isLoading}
        onClick={onPlayButtonClick}
      />
      <div className="track__status">
        {renderAudio()}
      </div>
    </div>;
  }
}
