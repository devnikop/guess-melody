import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';


const VictoryScene = (props) => {
  const {
    mistakes,
    onClick
  } = props;

  const handleButtonClick = () => {
    onClick();
  };

  return <section className="result">
    <div className="result__logo">
      <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/>
    </div>
    <h2 className="result__title">Вы настоящий меломан!</h2>
    <p className="result__total">За 3 минуты и 25 секунд вы набрали 12 баллов (8 быстрых), совершив {mistakes} ошибки</p>
    <p className="result__text">Вы заняли 2 место из 10. Это лучше чем у 80% игроков</p>
    <Link
      className="replay"
      to="/"
      onClick={handleButtonClick}>
        Сыграть ещё раз
    </Link>
  </section>;
};

VictoryScene.propTypes = {
  mistakes: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default VictoryScene;
