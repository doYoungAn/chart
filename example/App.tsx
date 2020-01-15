import React, { FC } from 'react';
import Linechart from './linechart';
import Timeline from './timeline';
import Piechart from './piechart';

interface IAppProps {}

const App: FC<IAppProps> = (): JSX.Element => {

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <Linechart />
        <Timeline />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Piechart />
      </div>
    </>
  );

};

export default App;
