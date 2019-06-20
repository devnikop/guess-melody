enum Type {
  ARTIST = "artist",
  GENRE = "genre",
};

enum GenreType {
  ROCK = "rock",
  POP = "pop",
  JAZZ = "jazz",
  ELECTRONIC = "electronic",
  ALTERNATIVE = "alternative",
  COUNTRY = "country",
  REGGAE = "reggae",
};

interface QuestionArtist {
  answers: QuestionArtistAnswer[],
  song: QuestionArtistSong,
  type: Type,
}

interface QuestionArtistAnswer {
  artist: string,
  picture: string,
}

interface QuestionArtistSong {
  artist: string,
  src: string
}

interface QuestionGenre {
  answers: QuestionGenreAnswer[],
  genre: GenreType,
  type: Type,
}

interface QuestionGenreAnswer {
  genre: GenreType,
  src: string,
}

type Answer = QuestionGenreAnswer | QuestionArtistSong;

type RenderAnswer = (answer: Answer, currentItem: number) =>
  React.ReactElement;

export {
  GenreType,
  QuestionArtist,
  QuestionArtistAnswer,
  QuestionArtistSong,
  QuestionGenre,
  QuestionGenreAnswer,
  RenderAnswer,
  Type,
}
