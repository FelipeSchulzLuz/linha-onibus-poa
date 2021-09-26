import { useContext, useEffect, useRef, useState } from "react";
import style from "./style.module.scss"
import { IBus } from "../../../core/models/IBus.model";
import loadLinesList, { loadLongLat } from "../../../core/services/busLine.service";
import Switch from '@material-ui/core/Switch';
import BusContext from "../../../core/store/store";
import classNames from "classnames";

export default function Index() {
    const [data, setData] = useState([]);
    const [dataFilter, setDataFilter] = useState([]);
    const [search, setSearch] = useState('');
    const [isBus, setIsBus] = useState(true);
    const activeLine = useRef(null);
    const [active, setActive] = useState(false);

    console.log(activeLine);

    const { setCoords } = useContext(BusContext);

    useEffect(() => {
        loadLinesList(isBus).then((res) => {
            setData(res);
            setDataFilter(res);
        })
    }, [isBus]);

    function handleChange(event: any) {
        setIsBus(!isBus);
        setSearch('')
    }

    function handleClick(event: any, id: string) {
        loadLongLat(id).then((res) => {
            setCoords(res)
        })
    }

    function handleSearchChange(event: any) {
        const searchRes = event.target.value.toLowerCase();
        setSearch(searchRes);
        const result = data.filter((item: IBus) => item.nome.toLowerCase().includes(searchRes || '') || item.codigo.toLowerCase().includes(searchRes || ''));
        setDataFilter(result);
    }

    return (
        <div className={style.container}>
            <div className={style.selectorGroup}>
                <Switch checked={isBus} onClick={handleChange} />
                <label className={style.label}>{isBus ? "Ônibus" : "Lotação"}</label>
            </div>
            <div className={style.col}>
                <input value={search} className={style.item} type="search" placeholder="Buscar" onChange={handleSearchChange} />
            </div>
            <div className={classNames(style.row, style.header)}>
                <div className="col">Nome</div>
                <div className="col">Linha</div>
            </div>
            {dataFilter.map((item: IBus) => (
                <div key={item.id} className={style.row} onClick={(e) => { handleClick(e, item.id) }}>
                    <div className={style.item} >{item.nome}</div>
                    <div className={style.item} >{item.codigo}</div>
                </div>
            ))}
        </div>
    );
}



