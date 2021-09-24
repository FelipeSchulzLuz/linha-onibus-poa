import * as React from 'react';


const BusConstext = React.createContext<any>({
    coords: {},
    changeCoords: (list: any[]) => { },
});

export default BusConstext;