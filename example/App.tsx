import React, { FC, useEffect } from 'react';
import Linechart from './linechart';

interface IAppProps {}

const App: FC<IAppProps> = (): JSX.Element => {

  return (
    <>
      <Linechart />
    </>
  );

};

export default App;
