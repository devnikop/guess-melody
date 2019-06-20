import * as React from 'react';

interface Props {
  mistakes: number,
}

const MistakeScreen: React.FunctionComponent<Props> = (props) => {
  const {mistakes} = props;

  return (<div className="game__mistakes">
    {[...Array(mistakes)].map((it, i) =>
      <div className="wrong" key={`mistake${i}`}></div>
    )}
  </div>);
};

export default MistakeScreen;
