import React, { FC, useState, useEffect } from 'react';
import Linechart from './linechart';
import Barchart from './barchart';
import Timeline from './timeline';
import Piechart from './piechart';
import HalfDonutchart from './halfDonutchart';
import MultiBarchart from './multiBarchart';

const halfDonutProps = [
  { data: Math.floor(Math.random() * 10) * 10, dataColor: '#B39DDB', tickSize: 30 },
  { data: Math.floor(Math.random() * 10) * 10, dataColor: '#80DEEA', tickSize: 30 },
  { data: Math.floor(Math.random() * 10) * 10, dataColor: '#C5E1A5', tickSize: 30 },
  { data: Math.floor(Math.random() * 10) * 10, dataColor: '#FFE082', tickSize: 30 },
]

interface IAppProps {}

const App: FC<IAppProps> = (): JSX.Element => {

  const [halfDonuts, setHalfDonuts] = useState<{ data: number, dataColor: string, tickSize: number }[]>(halfDonutProps);

  useEffect(() => {
    console.log(halfDonuts)
  })

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <Linechart />
        <Barchart />
        <MultiBarchart />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Timeline />
        <Piechart />
        <div className="card" style={{ width: '33%', height: 400, backgroundColor: '#757575', display: 'flex', flexWrap: 'wrap' }}>
          <div className="card-title">Half Donutchart</div>
          {halfDonuts.map((halfDonut, index) => (
            <div key={index} style={{ width: '50%', height: 350 / 2 }}>
              <HalfDonutchart
                data={halfDonut.data}
                dataColor={halfDonut.dataColor}
                tickSize={halfDonut.tickSize}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );

};

export default App;
