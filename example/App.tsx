import React, { FC, useState } from 'react';
import Header from './layout/header';
import Linechart from './components/linechart';
import Barchart from './components/barchart';
import Timeline from './components/timeline';
import Piechart from './components/piechart';
import HalfDonutchart from './components/halfDonutchart';
import MultiBarchart from './components/multiBarchart';
import Donutchart from './components/donutchart';
import HalfPieChart from './components/halfPiechart';
import Areachart from './components/areachart';
import Heatmap from './components/heatmap';
import Scatterplot from './components/scatterplot';
import Treemap from './components/treemap';

const halfDonutProps = [
  { data: Math.floor(Math.random() * 10) * 10, dataColor: '#B39DDB', tickSize: 30 },
  { data: Math.floor(Math.random() * 10) * 10, dataColor: '#80DEEA', tickSize: 30 },
  { data: Math.floor(Math.random() * 10) * 10, dataColor: '#C5E1A5', tickSize: 30 },
  { data: Math.floor(Math.random() * 10) * 10, dataColor: '#FFE082', tickSize: 30 },
];

interface IAppProps {}

const App: FC<IAppProps> = (): JSX.Element => {

  const [halfDonuts, setHalfDonuts] = useState<{ data: number, dataColor: string, tickSize: number }[]>(halfDonutProps);

  return (
    <>
      <Header />
      <div className="content">
        <div className="row">
          <Linechart />
          <Barchart />
          <MultiBarchart />
        </div>
        <div className="row">
          <Timeline />
          <Piechart />
          <div className="card" style={{ width: '33%', height: 400, display: 'flex', flexWrap: 'wrap' }}>
            <div className="card-title">Donutchart</div>
            <div style={{ width: '100%', height: 350 }}>
              <Donutchart />
            </div>
          </div>
        </div>
        <div className="row">
        <div className="card" style={{ width: '33%', height: 400, display: 'flex', flexWrap: 'wrap' }}>
          <div className="card-title">Half Piechart</div>
            {halfDonuts.map((halfDonut, index) => (
              <div key={index} style={{ width: '50%', height: 350 / 2 }}>
                <HalfPieChart
                  data={halfDonut.data}
                  dataColor={halfDonut.dataColor}
                  tickSize={halfDonut.tickSize}
                />
              </div>
            ))}
          </div>
          <div className="card" style={{ width: '33%', height: 400, display: 'flex', flexWrap: 'wrap' }}>
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
        <div className="row">
          <Heatmap />
          <Treemap /> 
          <Scatterplot />
        </div>
      </div>
    </>
  );

};

export default App;
