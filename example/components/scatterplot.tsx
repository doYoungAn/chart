import React, { FC, useRef, useEffect } from 'react';
import d3Extend, { IScatterplotConfig } from './../../lib';

interface IScatterplotProps {}

const Scatterplot: FC<IScatterplotProps> = (): JSX.Element => {

    const wrapper = useRef(null);

    useEffect(() => {
        const config: IScatterplotConfig = {
            element: wrapper.current,
            datas: [
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
                { x: Math.floor(Math.random() * 10) * 10, y: Math.floor(Math.random() * 10) * 10 },
            ]
        };
        d3Extend.Scatterplot(config);
    }, []);

    return (
        <>
            <div className="card" style={{ width: '33%', height: 400 }}>
                <div className="card-title">Scatterplot</div>
                <div ref={wrapper} style={{ width: '100%', height: 350 }}></div>
            </div>
        </>
    );
};

export default Scatterplot;
