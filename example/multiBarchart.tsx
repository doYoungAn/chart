import React, { FC, useRef, useEffect } from 'react';
import d3Extend, { IMultiBarchartConfig } from './../lib';

interface IMultiBarchartProps {}

const MultiBarchart: FC<IMultiBarchartProps> = (): JSX.Element => {

  const wrapper = useRef(null);

  useEffect(() => {
    const config: IMultiBarchartConfig = {
      element: wrapper.current,
      datas: [
        { category: 'benzene', values: [
          { rate: '1', value: 100 },
          { rate: '2', value: 20 },
          { rate: '3', value: 30 },
          { rate: '4', value: 40 },
        ] },
        { category: 'toluens', values: [
          { rate: '1', value: 200 },
          { rate: '2', value: 100 },
          { rate: '3', value: 150 },
          { rate: '4', value: 120 },
        ] },
        { category: 'toluens1', values: [
          { rate: '1', value: 200 },
          { rate: '2', value: 100 },
          { rate: '3', value: 150 },
          { rate: '4', value: 120 },
        ] },
        { category: 'toluens2', values: [
          { rate: '1', value: 200 },
          { rate: '2', value: 100 },
          { rate: '3', value: 150 },
          { rate: '4', value: 120 },
        ] },
      ],
      yRange: [0, 200]
    };
    d3Extend.MultiBarchart(config);
  }, [])

  return (
    <>
      <div className="card" style={{ width: '33%', height: 400 }}>
        <div className="card-title">Multi Barchart</div>
        <div ref={wrapper} style={{ width: '100%', height: 350 }}></div>
      </div>
    </>
  )
};

export default MultiBarchart;
