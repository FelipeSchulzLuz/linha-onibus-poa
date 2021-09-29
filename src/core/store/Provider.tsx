import React, { Props } from 'react';
import { ICoords } from '../models/ICoords.model';
import BusContext from './store';


function Provider(props: Props<any>) {
    const [coords, setCoords] = React.useState<ICoords[]>([]);
    return (
        <BusContext.Provider value={{ coords, setCoords }} >
            {props.children}
        </BusContext.Provider>
    );
}

export default Provider;