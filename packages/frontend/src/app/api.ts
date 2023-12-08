import { ResponseCount } from "@click-count/core/types";
const endpoint = () => `${process.env.NEXT_PUBLIC_API_ENDPOINT}/count`;


export const getCount = async (): Promise<ResponseCount> => {
    const res = await fetch(endpoint(), {
        method: 'GET',
        mode: 'cors',
    });
    return res.json();
};

export const updateCount = async (): Promise<ResponseCount> => {
    const res = await fetch(endpoint(), { 
        method: 'POST',
        mode: 'cors',
    });
    return res.json();
};