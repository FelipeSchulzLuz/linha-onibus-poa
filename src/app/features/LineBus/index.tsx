import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import style from "./style.module.scss"
import { IBus } from "../../../core/models/IBus.model";
import loadLinesList, { loadLongLat } from "../../../core/services/busLine.service";
import Switch from '@material-ui/core/Switch';
import BusContext from "../../../core/store/store";
import { Typography } from "@material-ui/core";
import { ICoords } from "../../../core/store/Provider";

export default function Index() {
    const [data, setData] = useState([]);
    const [dataFilter, setDataFilter] = useState([]);
    const [search, setSearch] = useState('');
    const [isBus, setIsBus] = useState(true);
    const [isActive, setActive] = useState('');

    const { setCoords } = useContext(BusContext);

    useEffect(() => {
        loadLinesList(isBus).then((res: ICoords[]) => {
            setData(res);
            setDataFilter(res);
        })
        changeColorTitle(isBus);
    }, [isBus, isActive]);

    function changeColorTitle(boolean: Boolean) {
        const divBus = document.getElementById('bus');
        const divLotation = document.getElementById('lotation');
        if (boolean) {
            divBus.style.color = '#FFF';
            divLotation.style.color = '#888888';
        } else {
            divBus.style.color = '#888888';
            divLotation.style.color = '#FFF';
        }
    }

    function handleChange(event: SyntheticEvent) {
        setIsBus(!isBus);
        setSearch('')
    }

    function handleClick(event: SyntheticEvent, id: string) {
        document.getElementById(isActive)?.classList.remove(style.active);
        loadLongLat(id).then((res) => {
            setCoords(res)
        })
        event.currentTarget.classList.add(style.active);
    }

    function handleSearchChange(event: SyntheticEvent) {
        const searchRes = (event.target as HTMLInputElement).value.toLowerCase();
        setSearch(searchRes);
        const result = data.filter((item: IBus) => item.nome.toLowerCase().includes(searchRes || '') || item.codigo.toLowerCase().includes(searchRes || ''));
        setDataFilter(result);
    }

    return (
        <div className={style.container}>
            <div className={style.selectorGroup}>
                <Typography id="lotation" className={style.titleChoices} variant="h5">Lotação</Typography>
                <Switch checked={isBus} onClick={handleChange} />
                <Typography id="bus" className={style.titleChoices} variant="h5">Ônibus</Typography>
            </div>
            <div className={style.col}>
                <label hidden htmlFor="search">Busca:</label>
                <input id="search" value={search} className={style.item} type="search" placeholder="Buscar" onChange={handleSearchChange} />
            </div>
            <div className={style.header}>
                <div className="col">Nome</div>
                <div className="col">Linha</div>
            </div>
            {dataFilter.map((item: IBus) => (
                <div key={item.id} id={item.id}
                    className={style.row}
                    defaultValue={item.id}
                    onClick={(e) => {
                        setActive(item.id);
                        handleClick(e, item.id)
                    }}
                >
                    <div className="col">{item.nome}</div>
                    <div className="col">{item.codigo}</div>
                </div>
            ))
            }
        </div >
    )
}