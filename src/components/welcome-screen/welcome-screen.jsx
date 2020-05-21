import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

import { ActionCreator } from "../../store/reducer";

const WelcomeScreen = ({
  errorCount,
  time,
  incrementQuestion,
}) =>
  <section className="welcome">
    <div className="welcome__logo">
      <img
        alt="Угадай мелодию"
        src="img/melody-logo.png"
        width="186"
        height="83"
      />
    </div>
    <button className="welcome__button" onClick={incrementQuestion}>
      <span className="visually-hidden">Начать игру</span>
    </button>
    <h2 className="welcome__rules-title">Правила игры</h2>
    <p className="welcome__text">Правила просты:</p>
    <ul className="welcome__rules-list">
      <li>За {time} минут нужно ответить на все вопросы.</li>
      <li>Можно допустить {errorCount} ошибки.</li>
    </ul>
    <p className="welcome__text">Удачи!</p>
  </section>

WelcomeScreen.propTypes = {
  errorCount: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  incrementQuestion: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  incrementQuestion: () => dispatch(ActionCreator.incrementStep()),
});

export { WelcomeScreen };
export default connect(null, mapDispatchToProps)(WelcomeScreen);
