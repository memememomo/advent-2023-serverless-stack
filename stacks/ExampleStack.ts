import { Api, Bucket, NextjsSite, StackContext, Table } from "sst/constructs"; // "sst/constructs"から必要なモジュールをインポートします

export function ExampleStack({ stack }: StackContext) { // ExampleStack関数をエクスポートします
    // DynamoDBテーブルを作成
    const table = new Table(stack, "counter", { // "counter"という名前のDynamoDBテーブルを作成します
        fields: {
            counter: "string", // "counter"フィールドを文字列型で定義します
        },
        primaryIndex: {partitionKey: "counter"}, // パーティションキーを"counter"に設定します
    });

    // API GatewayエンドポイントとLambdaを作成
    const api = new Api(stack, "api", { // "api"という名前のAPI Gatewayエンドポイントを作成します
        // 全Lambda関数の共通設定
        defaults: {
            function: {
                bind: [table], // DynamoDBテーブルをバインドします
                runtime: "nodejs20.x" // ランタイムを"nodejs20.x"に設定します
            },
        },
        // APIエンドポイントの設定
        routes: {
            "GET /count": "packages/functions/src/get.main", // GETリクエストを"packages/functions/src/get.main"にルーティングします
            "POST /count": "packages/functions/src/put.main", // POSTリクエストを"packages/functions/src/put.main"にルーティングします
        },
    });

    const siteBucket = new Bucket(stack, "public"); // "public"という名前のS3バケットを作成します

    // Next.jsのデプロイ設定
    const site = new NextjsSite(stack, "NextSite", { // "NextSite"という名前のNext.jsサイトを作成します
        bind: [siteBucket, api], // S3バケットとAPI Gatewayエンドポイントをバインドします
        path: "packages/frontend", // ソースコードのパスを"packages/frontend"に設定します
        environment: {
            NEXT_PUBLIC_API_ENDPOINT: api.url, // 環境変数"NEXT_PUBLIC_API_ENDPOINT"にAPIのURLを設定します
        },
    });

    // 値の出力
    stack.addOutputs({ // スタックの出力を追加します
        SiteUrl: site.url, // サイトのURLを出力します
        ApiEndpoint: api.url, // APIのエンドポイントを出力します
    });

    return { // テーブルを返します
        table,
    }
}