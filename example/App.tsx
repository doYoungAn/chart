import React, { FC } from 'react';
import Linechart from './linechart';
import Timeline from './timeline';

interface IAppProps {}

const App: FC<IAppProps> = (): JSX.Element => {

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Linechart />
        <Timeline />
      </div>
    </>
  );

};

export default App;
