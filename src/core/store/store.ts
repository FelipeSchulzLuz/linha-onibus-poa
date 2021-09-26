import { ICoords } from './Provider';
import { createContext } from "react";


interface IStore {
    coords: ICoords[];
    setCoords: (coordinates: ICoords[]) => void;
}

export const store: IStore = {
    coords: [],
    setCoords: () => null
};

const BusContext = createContext<IStore>(store);
export default BusContext;