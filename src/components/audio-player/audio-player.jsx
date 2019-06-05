import React from 'react';
import PropTypes from 'prop-types';

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
  isLoading: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  renderAudio: PropTypes.func.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
};
