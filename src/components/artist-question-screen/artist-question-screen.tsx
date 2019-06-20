import * as React from 'react';

import {
  QuestionArtist,
  QuestionArtistAnswer,
  RenderAnswer,
} from '../../types'

interface Props {
  question: QuestionArtist,
  onAnswer: (answer: QuestionArtistAnswer) => void,
  renderAnswer: RenderAnswer,
}

export class ArtistQuestionScreen extends React.PureComponent<Props, null> {
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
              {it.artist}
            </label>
          </div>
        )}
      </form>
    </section>;
  }
}
