import React, { FC } from 'react';
import Linechart from './linechart';
import Timeline from './timeline';
import Piechart from './piechart';
import HalfDonutchart from './halfDonutchart';

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
        <HalfDonutchart />
      </div>
    </>
  );

};

export default App;
