import { Context, APIGatewayProxyEvent } from "aws-lambda"; // "aws-lambda"からContextとAPIGatewayProxyEventをインポートします

export default function handler(
    lambda: (evt: APIGatewayProxyEvent, context: Context) => Promise<string> // lambda関数を引数として持つ非同期関数を定義します
) {
    return async function (event: APIGatewayProxyEvent, context: Context) { // 非同期関数を返します
        let body, statusCode; // bodyとstatusCodeを定義します

        try {
            body = await lambda(event, context); // lambda関数を実行し、その結果をbodyに格納します
            statusCode = 200; // ステータスコードを200に設定します
        } catch (error) {
            statusCode = 500; // エラーが発生した場合、ステータスコードを500に設定します
            body = JSON.stringify({ // エラーメッセージをJSON形式でbodyに格納します
                error: error instanceof Error ? error.message : String(error),
            });
        }

        return {
            statusCode, // ステータスコードを返します
            body, // bodyを返します
            headers: { // ヘッダー情報を返します
                "Access-Control-Allow-Origin": "*", // 全てのオリジンからのアクセスを許可します
                "Access-Control-Allow-Credentials": true, // クレデンシャルを持つリクエストを許可します
            },
        };
    }
};