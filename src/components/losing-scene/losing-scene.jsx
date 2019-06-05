import React from 'react';
import PropTypes from 'prop-types';

const LosingScene = (props) => {
  const {
    onReplayClick
  } = props;

  const handleButtonClick = () => {
    onReplayClick();
  };

  return <section className="result">
    <div className="result__logo">
      <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/>
    </div>
    <h2 className="result__title">Какая жалость!</h2>
    <p className="result__total result__total--fail">У вас закончились все попытки. Ничего, повезёт в следующий раз!</p>
    <button
      className="replay"
      type="button"
      onClick={handleButtonClick}>
        Попробовать ещё раз
    </button>
  </section>;
};

LosingScene.propTypes = {
  onReplayClick: PropTypes.func.isRequired,
};

export default LosingScene;
