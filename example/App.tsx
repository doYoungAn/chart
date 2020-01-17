import React, { FC, useState } from 'react';
import Linechart from './linechart';
import Barchart from './barchart';
import Timeline from './timeline';
import Piechart from './piechart';
import HalfDonutchart from './halfDonutchart';
import MultiBarchart from './multiBarchart';
import Donutchart from './donutchart';
import HalfPieChart from './halfPiechart';
import Areachart from './areachart';

const halfDonutProps = [
  { data: Math.floor(Math.random() * 10) * 10, dataColor: '#B39DDB', tickSize: 30 },
  { data: Math.floor(Math.random() * 10) * 10, dataColor: '#80DEEA', tickSize: 30 },
  { data: Math.floor(Math.random() * 10) * 10, dataColor: '#C5E1A5', tickSize: 30 },
  { data: Math.floor(Math.random() * 10) * 10, dataColor: '#FFE082', tickSize: 30 },
];

const donutProps = [
  { data: Math.floor(Math.random() * 10) * 10, dataColor: '#B39DDB', tickSize: 30 },
  { data: Math.floor(Math.random() * 10) * 10, dataColor: '#80DEEA', tickSize: 30 },
  { data: Math.floor(Math.random() * 10) * 10, dataColor: '#C5E1A5', tickSize: 30 },
  { data: Math.floor(Math.random() * 10) * 10, dataColor: '#FFE082', tickSize: 30 },
]

interface IAppProps {}

const App: FC<IAppProps> = (): JSX.Element => {

  const [halfDonuts, setHalfDonuts] = useState<{ data: number, dataColor: string, tickSize: number }[]>(halfDonutProps);
  const [donuts, setdonuts] = useState<{ data: number, dataColor: string, tickSize: number }[]>(halfDonutProps);

  return (
    <>
      <div className="row">
        <Linechart />
        <Barchart />
        <MultiBarchart />
      </div>
      <div className="row">
        <Timeline />
        <Piechart />
        <div className="card" style={{ width: '33%', height: 400, backgroundColor: '#757575', display: 'flex', flexWrap: 'wrap' }}>
          <div className="card-title">Donutchart</div>
          {donuts.map((donut, index) => (
            <div key={index} style={{ width: '50%', height: 350 / 2 }}>
              <Donutchart
                data={donut.data}
                dataColor={donut.dataColor}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="row">
        <HalfPieChart />
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
        <Areachart />
      </div>
    </>
  );

};

export default App;
