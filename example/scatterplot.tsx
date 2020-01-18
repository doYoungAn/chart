import React, { FC, useRef, useEffect } from 'react';

interface IScatterplotProps {}

const Scatterplot: FC<IScatterplotProps> = (): JSX.Element => {

    const wrapper = useRef(null);

    useEffect(() => {

    }, []);

    return (
        <>
            <div className="card" style={{ width: '33%', height: 400 }}>
                <div className="card-title">Scatterplot</div>
                <div ref={wrapper} style={{ width: '100%', height: '100%' }}></div>
            </div>
        </>
    );
};

export default Scatterplot;