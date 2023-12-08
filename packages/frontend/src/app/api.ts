const endpoint = () => `${process.env.NEXT_PUBLIC_API_ENDPOINT}/count`;


export const getCount = async () => {
    const res = await fetch(endpoint(), {
        method: 'GET',
        mode: 'cors',
    });
    return res.json();
};

export const updateCount = async () => {
    const res = await fetch(endpoint(), { 
        method: 'POST',
        mode: 'cors',
    });
    return res.json();
};