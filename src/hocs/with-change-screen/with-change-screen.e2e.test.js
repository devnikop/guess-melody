// import React from 'react';
// import {shallow} from 'enzyme';

// import withChangeScreen from './with-change-screen';

// const MockComponent = () => <div/>;
// const MockComponentWrapped = withChangeScreen(MockComponent);

// const mock = {
//   questions: [
//     {
//       type: `genre`,
//       genre: `rock`,
//       answers: [
//         {
//           src: `test.mp3`,
//           genre: `rock`,
//         },
//         {
//           src: `test.mp3`,
//           genre: `rock`,
//         },
//         {
//           src: `test.mp3`,
//           genre: `jazz`,
//         },
//         {
//           src: `test.mp3`,
//           genre: `rock`,
//         },
//       ],
//     },
//     {
//       type: `artist`,
//       song: {
//         artist: `Jim Beam`,
//         src: `path.mp3`,
//       },
//       answers: [
//         {
//           picture: `path.jpg`,
//           artist: `John Snow`,
//         },
//         {
//           picture: `path.jpg`,
//           artist: `Jack Daniels`,
//         },
//         {
//           picture: `path.jpg`,
//           artist: `Jim Beam`,
//         },
//       ],
//     }
//   ],
// };

// it(`App correctly renders first screen`, () => {
//   const {questions} = mock;

//   const tree = renderer
//     .create(<App
//       gameOver={false}
//       gameTime={100}
//       maxMistakes={Infinity}
//       mistakes={0}
//       onReplayClick={jest.fn()}
//       onUserAnswer={jest.fn()}
//       onWelcomeScreenClick={jest.fn()}
//       questions={questions}
//       step={-1}
//     />)
//     .toJSON();

//   expect(tree).toMatchSnapshot();
// });

// it(`App correctly renders genre question screen`, () => {
//   const {questions} = mock;
//   const tree = renderer.create(<App
//     gameOver={false}
//     gameTime={100}
//     maxMistakes={Infinity}
//     mistakes={0}
//     onReplayClick={jest.fn()}
//     onUserAnswer={jest.fn()}
//     onWelcomeScreenClick={jest.fn()}
//     questions={questions}
//     step={0}
//   />, {
//     createNodeMock: () => {
//       return {};
//     }
//   }).toJSON();

//   expect(tree).toMatchSnapshot();
// });

// it(`App correctly renders artist question screen`, () => {
//   const {questions} = mock;
//   const tree = renderer.create(<App
//     gameOver={false}
//     gameTime={100}
//     maxMistakes={Infinity}
//     mistakes={0}
//     onReplayClick={jest.fn()}
//     onUserAnswer={jest.fn()}
//     onWelcomeScreenClick={jest.fn()}
//     questions={questions}
//     step={1}
//   />, {
//     createNodeMock: () => {
//       return {};
//     }
//   }).toJSON();

//   expect(tree).toMatchSnapshot();
// });

// it(`App correctly renders victory screen`, () => {
//   const {questions} = mock;
//   const tree = renderer.create(<App
//     gameOver={false}
//     gameTime={100}
//     maxMistakes={Infinity}
//     mistakes={0}
//     onReplayClick={jest.fn()}
//     onUserAnswer={jest.fn()}
//     onWelcomeScreenClick={jest.fn()}
//     questions={questions}
//     step={2}
//   />, {
//     createNodeMock: () => {
//       return {};
//     }
//   }).toJSON();

//   expect(tree).toMatchSnapshot();
// });

// it(`App correctly renders losing screen`, () => {
//   const {questions} = mock;
//   const tree = renderer.create(<App
//     gameOver={false}
//     gameTime={100}
//     maxMistakes={1}
//     mistakes={1}
//     onReplayClick={jest.fn()}
//     onUserAnswer={jest.fn()}
//     onWelcomeScreenClick={jest.fn()}
//     questions={questions}
//     step={0}
//   />, {
//     createNodeMock: () => {
//       return {};
//     }
//   }).toJSON();

//   expect(tree).toMatchSnapshot();
// });
