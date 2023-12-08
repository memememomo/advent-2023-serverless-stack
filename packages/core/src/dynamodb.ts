import AWS from "aws-sdk";
import { Table } from "sst/node/table";
import { DocumentClient } from "aws-sdk/lib/dynamodb/document_client";

const client = new AWS.DynamoDB.DocumentClient();

export const updateCount = async (count: number) => {
    let params = {
        TableName: Table.counter.tableName,
        Item: {
            counter: "clicks",
            count: count,
        },
    }

    await put(params);
};

export const getOrUpdateCount = async () => {
    let params = {
        TableName: Table.counter.tableName,
        Key: {
            counter: "clicks",
        },
    };

    const result = await get(params);
    if (!result.Item) {
        await updateCount(0);
        return 0;
    }

    return result.Item.count;
};

const get = (params: DocumentClient.GetItemInput) => client.get(params).promise();
const put = (params: DocumentClient.PutItemInput) => client.put(params).promise();