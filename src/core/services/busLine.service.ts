import axios from 'axios';

const BASE_URL = "http://www.poatransporte.com.br/php/facades/process.php?"

export default async function loadLinesList(isBus: boolean) {
    const resp = await axios.get(`${BASE_URL}a=nc&p=%&t=${isBus ? "o" : "l"}`);
    return resp.data;
}

export async function loadLongLat(id: string) {
    const resp = await axios.get(`${BASE_URL}a=il&p=${id}`);
    return resp.data;
}
