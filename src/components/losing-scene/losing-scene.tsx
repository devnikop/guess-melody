import {Link} from 'react-router-dom';
import * as React from 'react';

interface Props {
  onClick: () => void,
}

const LosingScene: React.FunctionComponent<Props> = (props) => {
  const {
    onClick
  } = props;

  const handleButtonClick = () => {
    onClick();
  };

  return <section className="result">
    <div className="result__logo">
      <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/>
    </div>
    <h2 className="result__title">Какая жалость!</h2>
    <p className="result__total result__total--fail">У вас закончились все попытки. Ничего, повезёт в следующий раз!</p>
    <Link
      className="replay"
      to="/"
      onClick={handleButtonClick}>
        Попробовать ещё раз
    </Link>

  </section>;
};

export default LosingScene;
