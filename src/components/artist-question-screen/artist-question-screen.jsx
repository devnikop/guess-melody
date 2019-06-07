import React from 'react';
import PropTypes from 'prop-types';

export class ArtistQuestionScreen extends React.PureComponent {
  render() {
    const {
      question,
      onAnswer,
      renderAnswer
    } = this.props;

    return <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>
      {renderAnswer(question.song, 0)}

      <form className="game__artist">
        {question.answers.map((it, i) =>
          <div className="artist" key={i}>
            <input
              className="artist__input visually-hidden"
              type="radio" name="answer"
              value={`artist-${i}`}
              id={`artist-${i}`}
              onChange={() => onAnswer(it)}
            />
            <label className="artist__name" htmlFor={`artist-${i}`}>
              <img className="artist__picture" src={it.picture} alt={it.artist} />
              Пелагея
            </label>
          </div>
        )}
      </form>
    </section>;
  }
}

ArtistQuestionScreen.propTypes = {
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      artist: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
    })).isRequired,
    song: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    }).isRequired,
    type: PropTypes.oneOf([`artist`]).isRequired,
  }).isRequired,
  onAnswer: PropTypes.func,
  renderAnswer: PropTypes.func.isRequired,
};
