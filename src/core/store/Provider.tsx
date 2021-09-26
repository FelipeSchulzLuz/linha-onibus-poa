import React, { Props } from 'react';
import BusContext from './store';

export interface ICoords {
    lat: string;
    lng: string;
}

function Provider(props: Props<any>) {
    const [coords, setCoords] = React.useState<ICoords[]>([]);
    return (
        <BusContext.Provider value={{ coords, setCoords }} >
            {props.children}
        </BusContext.Provider>
    );
}

export default Provider;