import React, { FC, useRef, useEffect } from 'react';
import d3Extend, { IHeatmapConfig } from './../lib';

interface IHeatmapProps {}

const Heatmap: FC<IHeatmapProps> = (): JSX.Element => {

    const wrapper = useRef(null);

    useEffect(() => {
        const config: IHeatmapConfig = {
            element: wrapper.current,
            xRange: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
            yRange: ['1', '2', '3', '4', '5'],
            valueRange: [0, 100],
            minColor: '#ffffff',
            maxColor: '#009688',
            datas: [
                { x: 'a', y: '1', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'a', y: '2', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'a', y: '3', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'a', y: '4', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'a', y: '5', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'b', y: '1', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'b', y: '2', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'b', y: '3', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'b', y: '4', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'b', y: '5', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'c', y: '1', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'c', y: '2', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'c', y: '3', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'c', y: '4', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'c', y: '5', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'd', y: '1', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'd', y: '2', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'd', y: '3', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'd', y: '4', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'd', y: '5', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'e', y: '1', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'e', y: '2', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'e', y: '3', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'e', y: '4', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'e', y: '5', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'f', y: '1', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'f', y: '2', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'f', y: '3', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'f', y: '4', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'f', y: '5', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'g', y: '1', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'g', y: '2', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'g', y: '3', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'g', y: '4', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'g', y: '5', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'h', y: '1', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'h', y: '2', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'h', y: '3', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'h', y: '4', value: Math.floor(Math.random() * 10) * 10 },
                { x: 'h', y: '5', value: Math.floor(Math.random() * 10) * 10 },
            ]
        };
        d3Extend.Heatmap(config);
    }, []);

    return (
        <>
            <div className="card" style={{ width: '33%', height: 400 }}>
                <div className="card-title">Heatmap</div>
                <div ref={wrapper} style={{ width: '100%', height: 350 }}></div>
            </div>
        </>
    );
};

export default Heatmap;