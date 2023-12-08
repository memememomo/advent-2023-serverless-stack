import { ResponseCount } from "@click-count/core/types"; // "@click-count/core/types"からResponseCountをインポートします
const endpoint = () => `${process.env.NEXT_PUBLIC_API_ENDPOINT}/count`; // APIエンドポイントを定義します


export const getCount = async (): Promise<ResponseCount> => { // getCount関数を非同期で定義し、Promise<ResponseCount>を返します
    const res = await fetch(endpoint(), { // APIエンドポイントからデータを取得します
        method: 'GET', // HTTPメソッドはGETを使用します
        mode: 'cors', // CORSモードを使用します
    });
    return res.json(); // 取得したデータをJSON形式で返します
};

export const updateCount = async (): Promise<ResponseCount> => { // updateCount関数を非同期で定義し、Promise<ResponseCount>を返します
    const res = await fetch(endpoint(), { // APIエンドポイントからデータを取得します
        method: 'POST', // HTTPメソッドはPOSTを使用します
        mode: 'cors', // CORSモードを使用します
    });
    return res.json(); // 取得したデータをJSON形式で返します
};
