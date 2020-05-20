import PropTypes from "prop-types";
import React from "react";

const AudioPlayer = ({
  isLoaded,
  isPlaying,
  onPlayButtonClick,
  renderAudio,
}) => {
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
        {renderAudio()}
      </div>
    </>
  );
};

AudioPlayer.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  renderAudio: PropTypes.func.isRequired,
};

export default AudioPlayer;
