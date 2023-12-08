import AWS from "aws-sdk"; // AWS SDKをインポートします
import { Table } from "sst/node/table"; // sst/node/tableからTableをインポートします
import { DocumentClient } from "aws-sdk/lib/dynamodb/document_client"; // aws-sdk/lib/dynamodb/document_clientからDocumentClientをインポートします

const client = new AWS.DynamoDB.DocumentClient(); // AWS.DynamoDB.DocumentClientのインスタンスを作成します

export const updateCount = async (count: number) => { // updateCount関数を非同期で定義し、引数にcountを取ります
    let params = { // パラメータを定義します
        TableName: Table.counter.tableName, // テーブル名を指定します
        Item: { // アイテムを指定します
            counter: "clicks", // counterの値を"clicks"に設定します
            count: count, // countの値を引数のcountに設定します
        },
    }

    await put(params); // put関数を呼び出し、paramsを引数に渡します
};

export const getOrUpdateCount = async () => { // getOrUpdateCount関数を非同期で定義します
    let params = { // パラメータを定義します
        TableName: Table.counter.tableName, // テーブル名を指定します
        Key: { // キーを指定します
            counter: "clicks", // counterの値を"clicks"に設定します
        },
    };

    const result = await get(params); // get関数を呼び出し、paramsを引数に渡し、結果をresultに格納します
    if (!result.Item) { // result.Itemが存在しない場合
        await updateCount(0); // updateCount関数を呼び出し、0を引数に渡します
        return 0; // 0を返します
    }

    return result.Item.count; // result.Item.countの値を返します
};

const get = (params: DocumentClient.GetItemInput) => client.get(params).promise(); // get関数を定義し、client.getの結果のPromiseを返します
const put = (params: DocumentClient.PutItemInput) => client.put(params).promise(); // put関数を定義し、client.putの結果のPromiseを返します
