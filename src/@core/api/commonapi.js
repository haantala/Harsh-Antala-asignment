import Request from '.';
import { ApiRoutes } from '../constants';

export const getCharacter = async (data) => {
    console.log(data);
    const res = await Request.get(`${ApiRoutes.GETCHARACTERS}?page=${data.page}&limit=${data.limit}&q=${data.q}&order_by=${data.order_by}&sort=${data.sort}`);
    return res;
};