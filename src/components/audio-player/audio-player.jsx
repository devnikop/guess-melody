import React from 'react';
import propTypes from 'prop-types';

export class AudioPlayer extends React.PureComponent {
  render() {
    const {
      isLoading,
      isPlaying,
      renderAudio,
      onPlayButtonClick
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

AudioPlayer.propTypes = {
  isPlaying: propTypes.bool.isRequired,
  isLoading: propTypes.bool.isRequired,
  renderAudio: propTypes.func.isRequired,
  onPlayButtonClick: propTypes.func.isRequired,
};
