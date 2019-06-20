import * as React from "react";

interface Props {
  onInputChange,
  onSubmit: () => void,
}

const AuthorizationScreen: React.FunctionComponent<Props> = (props) => {
  const {
    onInputChange,
    onSubmit,
  } = props;

  return <section className="login">
    <div className="login__logo">
      <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
    </div>
    <h2 className="login__title">Необходима авторизация</h2>
    <p className="login__text">Представтесь!</p>
    <form className="login__form" onSubmit={onSubmit} action="">
      <p className="login__field">
        <label className="login__label" htmlFor="name">Логин</label>
        <input className="login__input" onChange={(evt) => onInputChange(evt, `email`)} type="text" name="name" id="name" />
      </p>
      <p className="login__field">
        <label className="login__label" htmlFor="password">Пароль</label>
        <input className="login__input" onChange={(evt) => onInputChange(evt, `password`)} type="text" name="password" id="password" />
        <span className="login__error">Неверный пароль</span>
      </p>
      <button className="login__button button" type="submit">Войти</button>
    </form>
  </section>;
};

// AuthorizationScreen.propTypes = {
//   onInputChange: PropTypes.func.isRequired,
//   onSubmit: PropTypes.func.isRequired,
// };

export default AuthorizationScreen;
